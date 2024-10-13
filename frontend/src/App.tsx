import './index.css'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

import routes from './routes'
import Layout from './pages/Layout'
import Page404 from '@/pages/Page404'
import { ThemeProvider } from '@/components/theme-provider'

function App() {

    const router = createBrowserRouter(
        [
            {
                element: <Layout />,
                errorElement: <Page404 />,

                children: routes
            }
        ],
        {
            basename: '/'
        }
    )

    return (
        <ThemeProvider defaultTheme="dark" storageKey='vite-ui-theme'>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
