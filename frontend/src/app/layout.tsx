import type { Metadata } from 'next';
import './globals.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { AppProvider } from '@contexts/AppContext';
import { FlashMessagesProvider } from '@components/ui/flash-messages/flash-messages.context';

export const metadata: Metadata = {
  title: 'OpenHR AI',
  description:
    'OpenHR AI is an AI-powered performance review platform that uses your voice to generate personalized performance reviews.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-black relative overflow-x-hidden">
        <FlashMessagesProvider>
          <AppProvider>
            <Header />
            <main className="flex-grow mt-[75px] relative">{children}</main>
            <Footer />
          </AppProvider>
        </FlashMessagesProvider>
      </body>
    </html>
  );
}
