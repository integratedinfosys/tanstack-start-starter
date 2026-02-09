
import { useLocation } from '@tanstack/react-router';
import { useState } from "react";
import LoginDialog from "./login-dialog";
import SignupDialog from "./signup-dialog";

export default function AuthDialog() {
    const location = useLocation().pathname;
    const [isLogin, setIsLogin] = useState(true)
    function flipLoginState(isLoginParam: boolean): void {
        setIsLogin(isLoginParam)
    }
    const [open, setOpen] = useState(false)
    return (
        isLogin ? <LoginDialog redirectTo={location} flipParentLoginState={flipLoginState} open={open} setOpen={setOpen} /> : <SignupDialog redirectTo={location} flipParentLoginState={flipLoginState} open={open} setOpen={setOpen} />

    )
}
