import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ZIMEIRA TECH - Jasa komputer, desain, dan website Pagaralam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script id="remove-extension-hydration-attrs" strategy="beforeInteractive">
          {`
            (function () {
              function removeExtensionAttributes(element) {
                if (!element || element.nodeType !== 1 || !element.attributes) return;

                for (var index = element.attributes.length - 1; index >= 0; index -= 1) {
                  var attributeName = element.attributes[index].name;

                  if (attributeName.indexOf('bis_') === 0) {
                    element.removeAttribute(attributeName);
                  }
                }
              }

              function cleanExtensionAttributes(root) {
                if (!root || !root.querySelectorAll) return;

                if (root.nodeType === 1) {
                  removeExtensionAttributes(root);
                }

                var elements = root.querySelectorAll('*');
                for (var index = 0; index < elements.length; index += 1) {
                  removeExtensionAttributes(elements[index]);
                }
              }

              cleanExtensionAttributes(document);

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                  cleanExtensionAttributes(document);
                }, { once: true });
              }

              if (window.MutationObserver) {
                var observer = new MutationObserver(function (mutations) {
                  for (var index = 0; index < mutations.length; index += 1) {
                    var mutation = mutations[index];

                    if (
                      mutation.type === 'attributes' &&
                      mutation.attributeName &&
                      mutation.attributeName.indexOf('bis_') === 0 &&
                      mutation.target &&
                      mutation.target.nodeType === 1
                    ) {
                      removeExtensionAttributes(mutation.target);
                    }

                    if (mutation.type === 'childList') {
                      for (var nodeIndex = 0; nodeIndex < mutation.addedNodes.length; nodeIndex += 1) {
                        cleanExtensionAttributes(mutation.addedNodes[nodeIndex]);
                      }
                    }
                  }
                });

                observer.observe(document.documentElement, {
                  attributes: true,
                  childList: true,
                  subtree: true
                });
              }
            })();
          `}
        </Script>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
