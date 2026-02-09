import AuthDialog from '@/components/app/auth/auth-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { signOut, useSession } from '@/lib/auth/auth-client'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/auth-todelete')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session, isPending } = useSession()
  const [isTransistion, startTransition] = useTransition()
  const handleSignOut = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully')
            // navigate({
            //   to: '/',
            // })
          },
          onError: ({ error }) => {
            toast.error(error.message)
          },
        },
      })
    })
  }
  return (<div>
    {isPending ?
      <div className='flex items-center justify-center h-screen'>
        <Spinner className='size-24' />
      </div>
      : session ?
        <div>You are already logged in. Either go to <Link to='/' className={buttonVariants({ variant: 'outline' })}>Home Page </Link>or <Button disabled={isTransistion} variant='outline' onClick={() => { handleSignOut(); }}>
          <LogOutIcon />{isTransistion ? 'Signing Out...' : 'Sign Out'}</Button></div>
        :
        <AuthDialog />}
  </div>)
}
