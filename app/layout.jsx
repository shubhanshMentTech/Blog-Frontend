import "./globals.css";
import Providers from "@app/providers";

export const metadata = { title: "Blog", description: "Blog frontend" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

