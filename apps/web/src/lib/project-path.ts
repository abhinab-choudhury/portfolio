import type {IProject} from './queries'

export function projectPath(project: Pick<IProject, '_id' | 'project_title' | 'slug'>) {
  const name = project.project_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project'
  return `/project/${encodeURIComponent(project.slug || `${name}--${project._id}`)}`
}
