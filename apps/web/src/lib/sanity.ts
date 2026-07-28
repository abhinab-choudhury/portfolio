import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string
const dataset = import.meta.env.VITE_SANITY_DATASET as string
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION as string

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})