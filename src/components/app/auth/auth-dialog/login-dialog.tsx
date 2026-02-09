import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas/auth'
import { useForm } from '@tanstack/react-form'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { signIn } from '@/lib/auth/auth-client'
import { PasswordInput } from '../../../password-input'
import { LogInIcon } from "lucide-react"

export default function LoginDialog({ redirectTo, flipParentLoginState, open, setOpen }: {
  redirectTo: string;
  flipParentLoginState: (stateParam: boolean) => void;
  open: boolean;
  setOpen: (setParameter: boolean) => void
}) {
  const redirectUrl = redirectTo

  const [isPending, startTransition] = useTransition()
  const [isGooglePending, startGoogleTransition] = useTransition()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        await signIn.email({
          email: value.email,
          password: value.password,
          // callbackURL: '/redirected',
          callbackURL: redirectUrl,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Logged in successfully')
              // navigate({
              //     to: pathname,
              // })
              setOpen(false)
            },
            onError: ({ error }) => {
              toast.error(error.message)
            },
          },
        })
        // const response = await signIn.email({
        //     email: value.email,
        //     password: value.password,
        // },
        //     {
        //         onSuccess: () => {
        //             toast.success('Logged in successfully')
        //             router.push('/dashboard')
        //         },
        //         onError: ({ error }) => {
        //             toast.error(error.message)
        //         }
        //     })
        // console.log(response)
      })
    },
  })

  const handleGoogleSignIn = async () => {
    startGoogleTransition(async () => {
      await signIn.social({
        provider: "google",
        // callbackURL: '/redirected',
        callbackURL: redirectUrl,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged in with Google successfully')
            // navigate({
            //     to: pathname,
            // })
            setOpen(false)
          },
          onError: ({ error }) => {
            toast.error(error.message)
          },
        },
      })
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline"><LogInIcon
      />Login/Signup</Button>} />
      {/* <DialogContent className="sm:max-w-sm"> */}
      <DialogContent className="max-w-md w-full" showCloseButton={false}>
        <Card >
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <FieldGroup>
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="john@john.com"
                          type="email"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <PasswordInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="******"
                          autoComplete="off"
                        />
                        {/* <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="******"
                                            type="password"
                                            autoComplete="off"
                                        /> */}
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <Field>
                  <Button disabled={isPending} type="submit">
                    {isPending ? 'Logging in...' : 'Login'}
                  </Button>
                  <Button disabled={isPending} variant="outline" type="button" onClick={handleGoogleSignIn}>
                    {isGooglePending ? 'Logging in with Google...' : 'Login with Google'}
                  </Button>
                  <DialogClose render={<Button variant="outline">Cancel</Button>} />

                  <FieldDescription className="text-center">
                    {/* Don&apos;t have an account? <Link to="/signup">Sign up</Link> */}
                    Don&apos;t have an account? <Button variant="link" onClick={() => { flipParentLoginState(false) }}>Sign up</Button>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </DialogContent>

    </Dialog>
  )
}
