import "@fontsource/inter";
import "./globals.css";

export const metadata = {
  title: "Kavach AppSec",
  description: "Enterprise DevSecOps Security Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Inter, sans-serif",
          backgroundColor: "#030712",
          color: "white",
        }}
      >
        {children}
      </body>
    </html>
  );
}