import './index.css'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

import routes from './routes'
import Layout from './pages/Layout'
import Page404 from '@/pages/Page404'
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from './contexts/AuthContext'

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
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey='vite-ui-theme'>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
