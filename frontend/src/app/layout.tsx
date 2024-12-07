import type { Metadata } from 'next';
import './globals.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { AppProvider } from '@contexts/AppContext';
import { FlashMessagesProvider } from '@components/ui/flash-messages/flash-messages.context';
import logo from '@assets/icons/logo.svg';

export const metadata: Metadata = {
  title: 'OpenHR AI',
  description:
    'OpenHR AI is an AI-powered performance review platform that uses your voice to generate personalized performance reviews.',
  icons: {
    icon: logo,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
