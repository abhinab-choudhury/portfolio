import { pathToFileURL } from "node:url";

export function contributionFields(pr, username) {
  if (pr.repository.isPrivate) return null;
  return {
    githubId: pr.id,
    githubAvailable: true,
    githubEligible:
      pr.state === "MERGED" &&
      !pr.isDraft &&
      pr.repository.owner.login.toLowerCase() !== username.toLowerCase(),
    org_name: pr.repository.owner.login,
    org_url: pr.repository.owner.url,
    project_name: pr.repository.nameWithOwner,
    repo_url: pr.repository.url,
    pr_url: pr.url,
    status: pr.isDraft ? "in_progress" : pr.state.toLowerCase(),
    mergedAt: pr.mergedAt,
    githubTitle: pr.title,
  };
}

export function contributionMutation(pr, username, existing) {
  const fields = contributionFields(pr, username);
  if (!fields) return null;
  // Editorial fields are only initialized, never overwritten by a sync.
  const defaults = { pr_title: pr.title, show: true, pinned: false };
  return existing
    ? { patch: { id: existing._id, set: fields, setIfMissing: defaults } }
    : { create: { _type: "openSource", ...fields, ...defaults } };
}

export async function sync(env = process.env, request = fetch) {
  for (const name of [
    "GITHUB_TOKEN",
    "GITHUB_USERNAME",
    "SANITY_PROJECT_ID",
    "SANITY_DATASET",
    "SANITY_WRITE_TOKEN",
  ]) {
    if (!env[name]) throw new Error(`Missing ${name}`);
  }
  if (
    !/^[a-z0-9]+$/.test(env.SANITY_PROJECT_ID) ||
    !/^[a-z0-9_-]+$/.test(env.SANITY_DATASET)
  ) {
    throw new Error("Invalid Sanity project or dataset");
  }
  const base = `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data`;
  async function json(url, options) {
    const response = await request(url, {
      ...options,
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
      throw new Error(`API request failed (${response.status})`);
    const body = await response.json();
    if (body.errors || body.error)
      throw new Error("API returned an error; no further changes applied");
    return body;
  }
  const sanityHeaders = {
    Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
    "Content-Type": "application/json",
  };
  const query = '*[_type == "openSource"]{_id, githubId, pr_url}';
  const { result: existing } = await json(
    `${base}/query/${env.SANITY_DATASET}?query=${encodeURIComponent(query)}&perspective=raw`,
    { headers: sanityHeaders },
  );
  const prs = [];
  let after = null;
  do {
    const { data } = await json("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($login: String!, $after: String) {
          user(login: $login) { pullRequests(first: 100, after: $after) {
            nodes { id title url state isDraft mergedAt repository {
              nameWithOwner url isPrivate owner { login url }
            } }
            pageInfo { hasNextPage endCursor }
          } }
        }`,
        variables: { login: env.GITHUB_USERNAME, after },
      }),
    });
    if (!data?.user) throw new Error("GitHub user not found");
    const page = data.user.pullRequests;
    prs.push(...page.nodes);
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (after);

  const mutations = [];
  const publicIds = new Set();
  for (const pr of prs) {
    if (pr.repository.isPrivate) continue;
    publicIds.add(pr.id);
    const matches = existing.filter(
      (doc) => doc.githubId === pr.id || doc.pr_url === pr.url,
    );
    // Update draft metadata too, without publishing editorial changes.
    if (matches.length) {
      for (const doc of matches)
        mutations.push(contributionMutation(pr, env.GITHUB_USERNAME, doc));
    } else {
      mutations.push(contributionMutation(pr, env.GITHUB_USERNAME));
    }
  }
  // Hide previously imported records no longer publicly discoverable.
  for (const doc of existing) {
    if (doc.githubId && !publicIds.has(doc.githubId)) {
      mutations.push({
        patch: {
          id: doc._id,
          set: { githubEligible: false, githubAvailable: false },
        },
      });
    }
  }
  for (let i = 0; i < mutations.length; i += 100) {
    await json(`${base}/mutate/${env.SANITY_DATASET}`, {
      method: "POST",
      headers: sanityHeaders,
      body: JSON.stringify({ mutations: mutations.slice(i, i + 100) }),
    });
  }
  console.log(
    `Synced ${publicIds.size} public PRs; applied ${mutations.length} mutations.`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  sync().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
