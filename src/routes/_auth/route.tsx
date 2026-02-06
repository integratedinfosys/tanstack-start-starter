import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex min-h-svh w-full mt-4 justify-center">
    <div className="w-full max-w-sm">
      <Outlet />
    </div>
  </div>
}
