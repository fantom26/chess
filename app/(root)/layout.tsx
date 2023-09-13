import { Providers } from "./providers";

import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: "400",
  subsets: ["latin"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <Providers>
          <div className="wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
