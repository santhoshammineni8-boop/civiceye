import "./globals.css";
import Link from "next/link";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 text-neutral-900 antialiased">

        <Providers>

          {/* NAVBAR */}
          <header className="sticky top-0 z-50 bg-black border-b border-neutral-200">
            <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">

              {/* Brand */}
              <Link href="/" className="text-lg font-semibold">
                GovAI
              </Link>

              {/* Right Section */}
              <div className="flex items-center gap-6">

                <Link
                  href="/dashboard"
                  className="text-sm text-whit-600 hover:text-black transition"
                >
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center  gap-2 text-sm text-whit-600 hover:text-black transition"
                >
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                    👤
                  </div>
                  Profile
                </Link>
<Link
  href="/transparency"
  className="text-sm text-neutral-600 hover:text-black transition"
>
  AI Core
</Link>

              </div>

            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="min-h-screen pb-40">
            {children}
          </main>

        </Providers>

      </body>
    </html>
  );
}
