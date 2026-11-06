import "./globals.css";
import AuthProvider from "../context/AuthProvider";

export const metadata = {
  title: "BookNest - Personal Reading Tracker",
  description: "Track your reading journey with BookNest."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-gray-900 antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}