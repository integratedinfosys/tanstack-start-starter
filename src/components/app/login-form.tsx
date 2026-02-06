"use client"
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
import { loginSchema } from '@/schemas/auth'
import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from '@tanstack/react-router'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { signIn } from '@/lib/auth-client'
import { PasswordInput } from '../password-input'

export function LoginForm() {
    const navigate = useNavigate()
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
                    //callbackURL: '/dashboard',
                    fetchOptions: {
                        onSuccess: () => {
                            toast.success('Logged in successfully')
                            navigate({
                                to: '/dashboard',
                            })
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
                //callbackURL: '/dashboard',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Logged in with Google successfully')
                        navigate({
                            to: '/dashboard',
                        })
                    },
                    onError: ({ error }) => {
                        toast.error(error.message)
                    },
                },
            })
        })
    }

    return (
        <Card className="max-w-md w-full">
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

                            <FieldDescription className="text-center">
                                Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}