/* eslint-disable @next/next/no-page-custom-font */
"use client"

import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { CartProvider } from "@/contexts/CartContext/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,400;0,700;1,400&family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Moraes Store | Desafio Hub Connect</title>
      </head>

      <body className="antialiased">
        <Provider>
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              <CartProvider>
                <Navbar />
                {children}
              </CartProvider>
            </QueryClientProvider>
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
