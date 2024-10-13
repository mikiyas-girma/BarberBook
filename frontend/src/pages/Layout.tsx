import { Outlet, useLocation } from "react-router-dom"
import Header from "@/sections/Header"
// import Footer from "@/sections/Footer"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"


export default function Layout() {
    const location = useLocation();
    const showHeader = !['/login', '/signup', '/'].includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}
            <main>
                <Suspense fallback={
                    <div className="flex flex-col gap-4 p-4">
                    </div>
                }>
                    <Outlet />
                </Suspense>
            <Toaster />
            </main>
            {/* <Footer /> */}
        </>
    )
}
