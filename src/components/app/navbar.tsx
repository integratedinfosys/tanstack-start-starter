"use client"
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from "@tanstack/react-router"
import React from 'react'

import { buttonVariants } from '../ui/button'

import { AuthComponent } from './auth-component'

import { ThemeToggle } from './theme-toggle'

const menuItems = [
    { name: 'Features', href: '/features' },
    { name: 'Solution', href: '/solution' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
]

export const Navbar = () => {
    const [menuState, setMenuState] = React.useState(false)
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const handleAuthComponentClick = () => {
        setMenuState(false)
    }
    // const { data: session, isPending } = useSession()
    // const router = useRouter()
    return (
        <header>
            {/* <nav
                data-state={menuState && 'active'}
                className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl"> */}
            <nav
                data-state={menuState && 'active'}
                className="fixed top-0 z-50 bg-background/95 border-b w-full backdrop-blur supports-backdrop-filter:bg-background/60">
                {/* <div className="mx-auto max-w-6xl px-6 transition-all duration-300"> */}
                <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
                    {/* <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4"> */}
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0 lg:py-3">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <img
                                    src="https://tanstack.com/images/logos/logo-color-banner-600.png"
                                    alt="TanStack Start Logo"
                                    className="size-6 lg:size-8"
                                />
                                <h1 className="text-lg font-semibold hover:font-bold">Next16 Starter</h1>
                            </Link>
                            <div className='flex gap-2 lg:hidden'>
                                <ThemeToggle />
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="hidden lg:block">
                                {/* <ul className="flex gap-8 text-sm"> */}
                                <ul className="flex gap-8 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            {/* <Link
                                                to={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link> */}
                                            {/* className="text-accent-foreground hover:font-semibold duration-150 hover:buttonVariants()" */}
                                            <Link
                                                to={item.href}
                                                className={pathname === item.href ? buttonVariants({ variant: 'secondary', size: 'sm' }) : buttonVariants({ variant: 'ghost', size: 'sm' })}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>



                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            {/* rounded-3xl */}
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            {/* <Link
                                                to={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link> */}
                                            <Link
                                                to={item.href}
                                                className={pathname === item.href ? "text-accent-foreground font-extrabold underline hover:font-semibold block duration-150" : "text-accent-foreground hover:font-semibold block duration-150"}
                                                onClick={() => setMenuState(false)}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm">
                                    <Link to="/">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm">
                                    <Link to="/">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                            </div> */}
                            <div className="flex items-center gap-3">
                                <div className='hidden lg:block'><ThemeToggle /></div>
                                <AuthComponent onClickLink={handleAuthComponentClick} />
                                {/* <>
                                    {isPending ? null : session ? (
                                        <>

                                            <Button onClick={() => { setMenuState(false); handleSignOut(); }} variant="secondary">
                                                Logout
                                            </Button>
                                            <Link href="/dashboard" className={buttonVariants()} onClick={() => setMenuState(false)}>
                                                Dashboard
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className={buttonVariants({ variant: 'secondary' })}
                                                onClick={() => setMenuState(false)}>
                                                Login
                                            </Link>

                                            <Link href="/signup" className={buttonVariants()} onClick={() => setMenuState(false)}>
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </> */}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;