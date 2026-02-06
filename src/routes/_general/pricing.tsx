import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_general/pricing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_general/pricing"!</div>
}
