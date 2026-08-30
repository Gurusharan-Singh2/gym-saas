import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastProvider } from '../components/ToastProvider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#120C08',
};

export const metadata = {
  title: {
    default: 'AURA ATHLETICS — Luxury High-Performance Athletic Club',
    template: '%s | AURA ATHLETICS',
  },
  description:
    'Experience the pinnacle of strength, movement, and recovery. AURA ATHLETICS offers state-of-the-art Eleiko equipment, Olympic lifting, Reformer Pilates, infrared recovery suites, and world-class master coaches.',
  keywords: [
    'luxury gym',
    'athletic club',
    'strength and conditioning',
    'reformer pilates',
    'cold plunge sauna',
    'personal training',
    'high performance fitness',
  ],
  authors: [{ name: 'AURA ATHLETICS CLUB' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-charcoal-950 text-brown-50 min-h-screen flex flex-col antialiased selection:bg-gold-accent selection:text-brown-950">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
