import { ChatSocketProvider } from "@/components/contexts/ChatSocketContext";
import { Metadata } from "next";
import { Inter } from "next/font/google";
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
                <ChatSocketProvider>
                    {children}
                </ChatSocketProvider>
            </body>
        </html>)
}