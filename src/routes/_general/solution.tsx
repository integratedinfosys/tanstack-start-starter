import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_general/solution')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_general/solution"!</div>
}
