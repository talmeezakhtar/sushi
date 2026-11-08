import type { Metadata } from "next";
import { Inter, Zen_Maru_Gothic } from "next/font/google";
import { Navbar } from "@/components/navbar";
import StickerSlapFooter from "@/components/ui/sticker-slap-footer";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Rounded, Japanese-friendly display face for headings, the logo and eyebrows.
const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  fallback: ["ui-rounded", "Comic Sans MS", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sushi.example.com"),
  title: "Sushi - Kaiten-Style Sushi Restaurant in Portland",
  description:
    "Sushi is a kaiten-belt sushi counter in Portland, Oregon. Fresh nigiri, sashimi and rolls circulate past your table on color-coded plates, priced by ring.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${zenMaruGothic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <StickerSlapFooter
            wordmark="sushi"
            homeHref="/"
            navLabel="menu"
            navHref="/menu"
            chatHref="mailto:hello@sushi.example"
            chatLabel="Contact Us"
            jobsLabel="Careers"
            jobs={[
              { title: "Sushi Chef", href: "#" },
              { title: "Front of House Staff", href: "#" },
            ]}
            officeLabel="Visit Us"
            address={["8 Kaiten Lane", "Portland, OR 97000"]}
            hours={["Mon - Thu 11:00 - 21:00", "Fri - Sat 11:00 - 22:00", "Sun 12:00 - 20:00"]}
            mapLabel="View on Google Maps"
            mapHref="https://www.google.com/maps/search/?api=1&query=8+Kaiten+Lane%2C+Portland%2C+OR"
            contactLabel="Contact"
            email="hello@sushi.example"
            phone="(555) 010-0148"
            copiedLabel="Email address copied"
            note="Demo project, not a real restaurant."
            socials={[
              { kind: "instagram", href: "#" },
              { kind: "tiktok", href: "#" },
            ]}
            stickers={["burst", "smiley", "heart", "daisy", "bubble", "camera"]}
            credits={[
              { role: "Design & Code", name: "Sushi Design Team" },
              { role: "Illustrations", name: "Custom artwork" },
              { role: "Typeface", name: "Zen Maru Gothic + Inter" },
            ]}
            paper="var(--background)"
            panel="var(--foreground)"
            ink="var(--foreground)"
            cream="var(--card)"
            accent="var(--primary)"
            fontSans="var(--font-inter), Helvetica, Arial, sans-serif"
          />
        </CartProvider>
      </body>
    </html>
  );
}
