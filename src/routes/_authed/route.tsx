import AuthForm from "@/components/app/auth-form";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: session, isPending } = useSession()
    const location = useLocation();
    const pathname = location.pathname;
    return (<div>{isPending ?
        <Spinner data-icon="inline-start" />
        : session ?
            <Outlet />
            :
            <AuthForm redirectTo={pathname} />}</div>)
}