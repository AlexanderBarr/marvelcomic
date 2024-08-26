import { GeistSans } from "geist/font/sans";
import "~/styles/globals.css";
import { TopNav } from "./_component/topnav";
import MarvelCharacters from "./_component/MarvelCharacters"; // Import the client component

export const metadata = {
  title: "Marvel Comics",
  description: "Repo for all things Marvel Comics!",
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
      <body className={`font-sans ${GeistSans.variable} dark`}>
        <div className="grid h-screen grid-rows-[auto,1fr]">
          <TopNav />
          <main className="overflow-y-scroll">
            <MarvelCharacters /> {/* Use the client component */}
            {children}
          </main>
          {modal}
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}
