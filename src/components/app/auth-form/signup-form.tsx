import { Button } from '@/components/ui/button'
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

import { useForm } from '@tanstack/react-form'


import { toast } from 'sonner'
import { useTransition } from 'react'
import { signIn, signUp } from '@/lib/auth-client'
import { PasswordInput } from '../../password-input'
import { signupSchema } from '@/schemas/auth'

interface SignUpFormProps {
    redirectTo: string | undefined;
    flipParentLoginState: (stateParam: boolean) => void;
}

export function SignupForm({ redirectTo, flipParentLoginState }: SignUpFormProps) {
    // const navigate = useNavigate()
    const redirectUrl = redirectTo ?? '/'
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

        <Card className="max-w-md w-full">
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

    )
}