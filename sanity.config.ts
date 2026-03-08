import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './studio/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  vite: {
    resolve: {
      alias: {
        '@': new URL('./studio', import.meta.url).pathname,
      },
    },
  },
})