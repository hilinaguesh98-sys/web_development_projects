import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Discover Ethiopian favorites and order from Addis Eats.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
