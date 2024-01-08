import { ReactNode, Suspense } from 'react';
import Header from 'components/layout/header';
import './globals.css';

const SITE_NAME = process.env.SITE_NAME || "TheSoul"
const baseUrl = process.env.STOREFRONT_PUBLIC_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Header />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
