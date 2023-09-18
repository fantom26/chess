import { Slide, ToastContainer } from "react-toastify";
import { Providers } from "./providers";

import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: ["400", "700"],
  subsets: ["latin"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <Providers>
          <div className="wrapper">{children}</div>
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
