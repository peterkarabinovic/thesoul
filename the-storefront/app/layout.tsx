import { ReactNode, Suspense } from 'react';
import { Libre_Baskerville, Roboto, Prata, Mr_De_Haviland } from 'next/font/google'
import './globals.css';


const SITE_NAME = process.env.SITE_NAME || 'TheSoul';
const SITE_LANG = process.env.SITE_LANG || 'uk';
const baseUrl = process.env.STOREFRONT_PUBLIC_URL || 'http://localhost:3000';

const libre = Libre_Baskerville({
    weight: ['400', '700'],
    display: 'swap',
    subsets: ['latin']
});

const mrDeHaviland = Mr_De_Haviland({
    weight: '400',
    display: 'swap',
    subsets: ['latin', 'latin-ext']
});

const prate = Prata({
    weight: '400',
    display: 'swap',
    subsets: ['latin', 'cyrillic']
});

const roboto = Roboto({
    weight: ['100','300','400','500','700','900'],
    display: 'swap',
    subsets: ['latin', 'cyrillic']
});


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
    <html lang={SITE_LANG} className="scroll-smooth" >
      <body className={`${roboto.className} ${libre.className} ${prate.className} ${mrDeHaviland.className} antialiased`}>
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
