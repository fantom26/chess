import { Slide, ToastContainer } from "react-toastify";
import { Providers } from "./providers";

import { Quicksand } from "next/font/google";

import { dir } from "i18next";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Header } from "@components/shared";
import { langs } from "@constants/shared/common";
import i18nConfig from "@i18n.config";
import initTranslations from "@i18n";
import { Metadata } from "next";

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

interface Params {
  params: {
    locale: string;
  };
}

type IRootLayout = Params & {
  children: ReactNode;
};

export const generateMetadata = async ({ params: { locale } }: Params): Promise<Metadata> => {
  const { t } = await initTranslations(locale, ["common"]);

  return {
    title: t("seo.title"),
    description: t("seo.description"),
    alternates: {
      canonical: "https://chess-fantom26.vercel.app"
    },
    openGraph: {
      type: "website",
      url: "https://chess-fantom26.vercel.app",
      title: t("seo.title"),
      description: t("seo.description"),
      locale,
      siteName: "Chess app",
      images: [
        {
          url: "/images/open-graph.jpg",
          alt: t("seo.openGraphAlt"),
          width: 1200,
          height: 630,
          type: "image/jpg"
        }
      ]
    },
    keywords: t("seo.keywords").split(","),
    icons: {
      shortcut: "/favicon.ico"
    }
  };
};

export const generateStaticParams = () => i18nConfig.locales.map((locale) => ({ locale }));

export default async function RootLayout({ children, params: { locale } }: IRootLayout) {
  const { options } = await initTranslations(locale, ["common"]);

  if (!langs.includes(locale)) {
    return notFound();
  }
  return (
    <html lang={locale} dir={dir(locale)} className={quicksand.className}>
      <body>
        <Providers locale={locale} namespaces={options.ns}>
          <div className="wrapper">
            <Header locale={locale} />
            <main>{children}</main>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            limit={4}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            role="alert"
            rtl={false}
            transition={Slide}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="dark"
          />
        </Providers>
      </body>
    </html>
  );
}
