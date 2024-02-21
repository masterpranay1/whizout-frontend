import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/components/contexts/UserContext";
import { SocketProvider } from "@/components/contexts/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wizout",
  description: "Connnect with your college friends :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <SocketProvider>
            <Header />
            {children}
          </SocketProvider>
        </UserProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
