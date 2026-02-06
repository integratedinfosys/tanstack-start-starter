import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_general/features')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_general/features"!</div>
}
