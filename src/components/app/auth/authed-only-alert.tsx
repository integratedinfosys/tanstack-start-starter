import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import AuthDialog from "./auth-dialog"

export function AuthedOnlyAlert() {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Login Needed</AlertDialogTitle>
          <AlertDialogDescription>
            To view this page you need to login or go to home page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AuthDialog />
          <Link to='/' className={buttonVariants({ variant: 'outline' })}>Home Page </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
