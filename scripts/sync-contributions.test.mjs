import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contributionFields,
  contributionMutation,
  sync,
} from "./sync-contributions.mjs";
const pr = {
  id: "PR_1",
  title: "Improve search",
  url: "https://github.com/org/repo/pull/1",
  state: "MERGED",
  isDraft: false,
  mergedAt: "2026-01-01T00:00:00Z",
  repository: {
    isPrivate: false,
    nameWithOwner: "org/repo",
    url: "https://github.com/org/repo",
    owner: { login: "org", url: "https://github.com/org" },
  },
};
test("automatic rules exclude private, own, unmerged and draft PRs", () => {
  assert.equal(contributionFields(pr, "author").githubEligible, true);
  assert.equal(contributionFields(pr, "ORG").githubEligible, false);
  assert.equal(
    contributionFields({ ...pr, state: "OPEN" }, "author").githubEligible,
    false,
  );
  assert.equal(
    contributionFields({ ...pr, isDraft: true }, "author").githubEligible,
    false,
  );
  assert.equal(
    contributionFields(
      { ...pr, repository: { ...pr.repository, isPrivate: true } },
      "author",
    ),
    null,
  );
});
test("sync preserves visibility, pin, title and description edits", () => {
  const { patch } = contributionMutation(pr, "author", {
    _id: "existing",
    show: false,
  });
  for (const key of ["show", "pinned", "visibility", "pr_title", "description"])
    assert.equal(key in patch.set, false);
  assert.equal(patch.id, "existing");
  assert.equal(contributionMutation(pr, "author").create.show, true);
});
test("pagination, URL matching, drafts, and missing public records", async () => {
  const mutations = [];
  let pages = 0;
  const existing = [
    { _id: "old", pr_url: pr.url },
    { _id: "drafts.old", pr_url: pr.url },
    { _id: "gone", githubId: "gone" },
  ];
  await sync(
    {
      GITHUB_TOKEN: "test",
      GITHUB_USERNAME: "author",
      SANITY_PROJECT_ID: "test",
      SANITY_DATASET: "production",
      SANITY_WRITE_TOKEN: "test",
    },
    async (url, options) => {
      let body;
      if (url.includes("/query/")) body = { result: existing };
      else if (url.includes("/mutate/")) {
        mutations.push(...JSON.parse(options.body).mutations);
        body = {};
      } else {
        pages++;
        if (pages === 2)
          assert.equal(JSON.parse(options.body).variables.after, "next");
        body = {
          data: {
            user: {
              pullRequests: {
                nodes: pages === 1 ? [pr] : [],
                pageInfo: { hasNextPage: pages === 1, endCursor: "next" },
              },
            },
          },
        };
      }
      return { ok: true, json: async () => body };
    },
  );
  assert.equal(pages, 2);
  assert.deepEqual(
    mutations.map((m) => m.patch.id),
    ["old", "drafts.old", "gone"],
  );
  assert.equal(mutations[2].patch.set.githubAvailable, false);
});
