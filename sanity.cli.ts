import {defineCliConfig} from 'sanity/cli'
import dotenv from 'dotenv'

dotenv.config()
export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
