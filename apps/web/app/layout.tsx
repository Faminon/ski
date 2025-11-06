import "./globals.css";
import Navbar from "@/components/Navbar";
import { IntlProvider } from "@/components/IntlProvider";

export const metadata = {
  title: "SkiBnB",
  description: "Location d'appartements de ski",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <IntlProvider>
          <Navbar />
          <main style={{ paddingTop: 80 }}>{children}</main>
        </IntlProvider>
      </body>
    </html>
  );
}