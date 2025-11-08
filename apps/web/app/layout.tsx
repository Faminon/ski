import "./globals.css";
import Navbar from "@/components/Navbar";
import { IntlProvider } from "@/components/IntlProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "SkiBnB",
  description: "Location d'appartements et chalets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <IntlProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
