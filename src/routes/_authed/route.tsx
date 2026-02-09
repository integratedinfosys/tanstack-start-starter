import { AuthedOnlyAlert } from "@/components/app/auth/authed-only-alert";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth/auth-client";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: session, isPending } = useSession()
    return (<div>
        {isPending ?
            <div className='flex items-center justify-center h-screen'>
                <Spinner className='size-24' />
            </div>
            : session ?
                <Outlet />
                :
                <AuthedOnlyAlert />}
    </div>)
}