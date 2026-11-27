import {sanityClient} from './sanity'

export interface IProject {
  _id: string
  slug?: string
  details?: string
  project_title: string
  description: string
  header_icon: string
  image_src?: string
  github_url?: string
  deployment_url?: string
  blog_url?: string
}

export interface ISocialLink {
  _id: string
  name: string
  url: string
  logo: string
}

export interface IRecentBlog {
  _id: string
  title: string
  gist: string
  link: string
  create_at: string
}

export interface IOpenSource {
  _id: string
  org_name?: string
  project_name: string
  org_url?: string
  repo_url?: string
  pr_title: string
  description?: string
  pr_url: string
  status: 'merged' | 'open' | 'in_progress' | 'closed'
  show: boolean
  pinned?: boolean
  mergedAt?: string
}

export async function getProjects(): Promise<IProject[]> {
  return sanityClient.fetch(
    `*[_type == "project" && show == true] | order(defined(order) desc, order asc, _createdAt desc) {
      _id,
      project_title,
      "slug": slug.current,
      description,
      header_icon,
      image_src,
      github_url,
      deployment_url,
      blog_url
    }`,
  )
}

export async function getSocialLinks(): Promise<ISocialLink[]> {
  return sanityClient.fetch(
    `*[_type == "socialLink" && show == true] | order(_createdAt asc) {
      _id,
      name,
      url,
      logo
    }`,
  )
}

export async function getRecentBlogs(): Promise<IRecentBlog[]> {
  return sanityClient.fetch(
    `*[_type == "recentBlog" && show == true] | order(create_at desc) {
      _id,
      title,
      gist,
      link,
      create_at
    }`,
  )
}

export async function getOpenSourceContributions(): Promise<IOpenSource[]> {
  return sanityClient.fetch(
    `*[_type == "openSource" && show == true && visibility != "hide" &&
      (!defined(githubId) || githubAvailable == true) &&
      (visibility == "show" || !defined(githubId) || githubEligible == true)]
      | order(coalesce(pinned, false) desc, coalesce(mergedAt, _createdAt) desc) {
      _id,
      org_name,
      project_name,
      org_url,
      repo_url,
      pr_title,
      description,
      pr_url,
      pinned,
      mergedAt,
      show,
      status
    }`,
  )
}

export interface IExperience {
  _id: string
  role: string
  company: string
  companyLogoUrl?: string
  companyUrl?: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
}

export async function getExperience(): Promise<IExperience[]> {
  return sanityClient.fetch(
    `*[_type == "experience" && show == true] | order(startDate desc, _createdAt desc) {
      _id, role, company, companyUrl, location, startDate, endDate, description,
      "companyLogoUrl": companyLogo.asset->url
    }`,
  )
}

export async function getProject(path: string): Promise<IProject | null> {
  const legacyId = path.includes('--') ? path.slice(path.lastIndexOf('--') + 2) : path
  return sanityClient.fetch(
    `*[_type == "project" && show == true && (slug.current == $path || _id == $legacyId)][0] {
      _id, project_title, description, header_icon, github_url, deployment_url, blog_url,
      "slug": slug.current, details
    }`,
    {path, legacyId},
  )
}
