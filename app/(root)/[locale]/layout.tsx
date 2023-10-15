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

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

interface IRootLayout {
  children: ReactNode;
  params: {
    locale: string;
  };
}

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
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
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
