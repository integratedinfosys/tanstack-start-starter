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
import { signupSchema } from '@/schemas/auth'
import { useForm } from '@tanstack/react-form'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { signIn, signUp } from '@/lib/auth/auth-client'
import { PasswordInput } from '../../../password-input'

export default function SignupDialog({ redirectTo, flipParentLoginState, open, setOpen }: {
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
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validators: {
            onSubmit: signupSchema,
        },
        onSubmit: ({ value }) => {
            startTransition(async () => {
                await signUp.email({
                    name: value.fullName,
                    email: value.email,
                    password: value.password,
                    // callbackURL: '/redirected',
                    callbackURL: redirectUrl,
                    fetchOptions: {
                        onSuccess: () => {
                            toast.success('Account creates successfully')
                            // navigate({
                            //     to: '/dashboard',
                            // })
                            setOpen(false)
                        },
                        onError: ({ error }) => {
                            toast.error(error.message)
                        },
                    },
                })
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
                        setOpen(false)
                    },
                    onError: ({ error }) => {
                        toast.error(error.message)
                    },
                },
            },
            )
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline">Signup/Login</Button>} />
            {/* <DialogContent className="sm:max-w-sm"> */}
            <DialogContent className="max-w-md w-full" showCloseButton={false}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                            Enter your information below to create your account
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
                                    name="fullName"
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    placeholder="John Fisher"
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

                                <form.Field
                                    name="confirmPassword"
                                    // This is the key part: listen to the password field's changes

                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                                <PasswordInput
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}

                                                    aria-invalid={isInvalid}
                                                    placeholder="Repeat Password"
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

                                <FieldGroup>
                                    <Field>
                                        <Button disabled={isPending} type="submit">
                                            {isPending ? 'Creating...' : 'Create Account'}
                                        </Button>
                                        <Button disabled={isPending} variant="outline" type="button" onClick={handleGoogleSignIn}>
                                            {isGooglePending ? 'Signing up with Google...' : 'Sign up with Google'}
                                        </Button>
                                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                                        <FieldDescription className="px-6 text-center">
                                            {/* Already have an account? <Link to="/login">Sign in</Link> */}
                                            Already have an account? <Button variant="link"
                                                onClick={() => { flipParentLoginState(true) }}>Sign in</Button>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>

        </Dialog>
    )
}
