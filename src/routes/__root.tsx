import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/lib/theme-provider'
import Navbar from '@/components/app/navbar'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
      {
        description: "TanStack Start Starter with Prisma, Better Auth, ShadCN "
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <div className='min-h-screen '>
            <Navbar />
            {/* <div className='max-w-7xl mx-auto mt-14 p-6 md:p-10'> */}
            <main className='max-w-7xl mx-auto mt-10 p-6 md:p-10'>
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Toaster closeButton position='top-center' />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
