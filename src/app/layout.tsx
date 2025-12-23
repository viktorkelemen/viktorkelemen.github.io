import type { Metadata } from "next";
import "./globals.css";
import FloatingShapes from "@/components/FloatingShapes";

export const metadata: Metadata = {
  title: "Viktor Kelemen",
  description: "Software engineer. Building things, making sounds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FloatingShapes />
        {children}
      </body>
    </html>
  );
}
