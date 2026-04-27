import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akshit Jareat - AI Developer | Full Stack Developer",
  description: "Building intelligent systems and scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
