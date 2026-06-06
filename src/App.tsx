import './App.css'
import {RouterProvider} from 'react-router/dom'
import {ThemeProvider} from './provider'
import {createBrowserRouter} from 'react-router'
import IndexPage from './pages'

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      Component: IndexPage,
    },
  ])
  return (
    <ThemeProvider>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  )
}

export default App
