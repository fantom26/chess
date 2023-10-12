import { Slide, ToastContainer } from "react-toastify";
import { Providers } from "./providers";

import { Quicksand } from "next/font/google";

import { dir } from "i18next";
import { ReactNode } from "react";
import { languages } from "@i18n/settings";
import { notFound } from "next/navigation";
import { Header } from "@components/shared";

export const generateStaticParams = async () => languages.map((lang) => ({ lang }));

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

interface IRootLayout {
  children: ReactNode;
  params: {
    lng: string;
  };
}

export default function RootLayout({ children, params: { lng } }: IRootLayout) {
  if (!languages.includes(lng)) {
    return notFound();
  }
  return (
    <html lang={lng} dir={dir(lng)} className={quicksand.className}>
      <body>
        <Providers>
          <div className="wrapper">
            <Header />
            <main>{children}</main>
          </div>
          <ToastContainer
            position="top-right"
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