import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
