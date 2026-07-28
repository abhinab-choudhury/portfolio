import {sanityClient} from './sanity'

export interface IProject {
  _id: string
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

export async function getProjects(): Promise<IProject[]> {
  return sanityClient.fetch(
    `*[_type == "project" && show == true] | order(_createdAt desc) {
      _id,
      project_title,
      description,
      header_icon,
      image_src,
      github_url,
      deployment_url,
      blog_url
    }`
  )
}

export async function getSocialLinks(): Promise<ISocialLink[]> {
  return sanityClient.fetch(
    `*[_type == "socialLink" && show == true] | order(_createdAt asc) {
      _id,
      name,
      url,
      logo
    }`
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
    }`
  )
}