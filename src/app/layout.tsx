import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TopNav } from "./_components/topnav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Marvel Comics",
  description: "Marvel Comics are fun",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} dark`}>
        <div className="grid h-screen grid-rows-[auto,1fr]">
          <TopNav />
          <main className="overflow-y-scroll">{children}</main>
          {modal}
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}
