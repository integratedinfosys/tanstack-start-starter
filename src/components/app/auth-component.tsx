import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BadgeCheckIcon, BellIcon, ChevronsUpDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button, buttonVariants } from '../ui/button'
import { signOut, useSession } from '@/lib/auth-client'

import { toast } from 'sonner'

import { Spinner } from '../ui/spinner'
import { cn } from '@/lib/utils'
import { Link, useNavigate } from '@tanstack/react-router'

export function AuthComponent({
    onClickLink
}: Readonly<{
    onClickLink: () => void
}>) {
    const { data: session, isPending } = useSession()
    const displayName = session?.user.name.split(' ')[0]
    const displayEmail = session?.user.email
    const userImageUrl = session?.user.image
    const imageUrl = userImageUrl ? userImageUrl : 'https://github.com/shadcn.png'

    const navigate = useNavigate()
    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Signed out successfully')
                    navigate({
                        to: '/',
                    })
                },
                onError: ({ error }) => {
                    toast.error(error.message)
                },
            },
        })
    }
    const menuContent = (
        <>
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => { onClickLink(); navigate({ to: '/account' }); }}>
                    <BadgeCheckIcon
                    />
                    Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onClickLink(); navigate({ to: '/billing' }); }}>
                    <CreditCardIcon
                    />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onClickLink(); navigate({ to: '/notifications' }); }}>
                    <BellIcon
                    />
                    Notifications
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { onClickLink(); handleSignOut(); }}>
                <LogOutIcon
                />
                Sign Out
            </DropdownMenuItem>
        </>
    )

    return (
        <div className="flex items-center justify-between gap-4">
            {isPending ?
                <Button variant="outline" disabled className="h-10">
                    <Spinner data-icon="inline-start" />
                    Fetching...
                </Button>
                : session ?
                    (<DropdownMenu>
                        {/* h-12 */}
                        <DropdownMenuTrigger render={<Button variant="outline" className="h-10 justify-start px-2 md:max-w-50">
                            <Avatar>
                                <AvatarImage src={imageUrl} alt="User Image" />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Hi! {displayName}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {displayEmail}
                                </span>
                            </div><ChevronsUpDownIcon className="text-muted-foreground ml-auto" />
                        </Button>} />
                        <DropdownMenuContent className="w-(--anchor-width) min-w-56">
                            {menuContent}
                        </DropdownMenuContent>
                    </DropdownMenu>)
                    // <DropdownMenu>
                    //    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
                    //      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                    //      <AvatarFallback>LR</AvatarFallback>
                    //    </Avatar></Button>} />
                    //    <DropdownMenuContent align="end" side="top">
                    //      {menuContent}
                    //    </DropdownMenuContent>
                    //  </DropdownMenu> 
                    :
                    // No need to show spinner as dropdown closes on clicking
                    <Link
                        to="/auth"
                        className={cn(buttonVariants({ variant: 'secondary' }), "h-10")}
                        onClick={() => onClickLink()}>
                        Login
                    </Link>
            }
        </div>
    )
}
