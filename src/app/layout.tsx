import React from 'react';
import './globals.css';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutoU - Análise de Email',
  description: 'Análise inteligente de emails com IA',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📧</text></svg>",
  },
}

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="pt-br">
            <body>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;