import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ToastContainer from "../components/ToastContainer";

export const metadata = {
  title: "HLApp - Healthcare Lifecycle App",
  description: "Secure role-based full-stack patient, treatment, and medical records lifecycle coordinator.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
