import './globals.css';

export const metadata = {
  title: 'BrandSparks AI - AI Content Generation',
  description: 'AI-Powered Marketing Content Generation Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
