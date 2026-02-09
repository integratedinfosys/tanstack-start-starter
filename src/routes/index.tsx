import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      {/* <div>Hi: {(import.meta.env.DEV ? import.meta.env.VITE_BETTER_AUTH_DEV_URL : import.meta.env.VITE_BETTER_AUTH_PROD_URL)}</div> */}
      <div>Hi</div>
    </>

  );
}
