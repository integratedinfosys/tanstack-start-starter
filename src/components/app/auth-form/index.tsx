import { useState } from "react"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

export default function AuthForm({ redirectTo }: { redirectTo: string | undefined }) {
    const [isLogin, setIsLogin] = useState(true)
    function flipLoginState(isLoginParam: boolean): void {
        setIsLogin(isLoginParam)
    }
    return (
        <div className="flex min-h-svh w-full mt-4 justify-center">
            <div className="w-full max-w-sm">
                {isLogin ? <LoginForm redirectTo={redirectTo} flipParentLoginState={flipLoginState} /> : <SignupForm redirectTo={redirectTo} flipParentLoginState={flipLoginState} />}
            </div>
        </div>

    )
}
