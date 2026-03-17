export const metadata = {
  title: "DEX URL Shortener",
  description: "Simple URL shortener",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
