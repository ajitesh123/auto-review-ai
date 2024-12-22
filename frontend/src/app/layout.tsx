import type { Metadata } from 'next';
import './globals.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { AppProvider } from '@contexts/AppContext';
import { FlashMessagesProvider } from '@components/ui/flash-messages/flash-messages.context';
import { LiveAPIProvider } from '@contexts/LiveAPIContext';

export const metadata: Metadata = {
  title: 'OpenHR AI',
  description:
    'OpenHR AI is an AI-powered performance review platform that uses your voice to generate personalized performance reviews.',
  icons: {
    icon: '/favicon.png',
  },
};


const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('set REACT_APP_GEMINI_API_KEY in .env');
}

const host = 'generativelanguage.googleapis.com';
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

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
        <LiveAPIProvider url={uri} apiKey={API_KEY}>
          <FlashMessagesProvider>
            <AppProvider>
              <Header />
              <main className="flex-grow mt-[75px] relative">{children}</main>
              <Footer />
            </AppProvider>
          </FlashMessagesProvider>
        </LiveAPIProvider>
      </body>
    </html>
  );
}
