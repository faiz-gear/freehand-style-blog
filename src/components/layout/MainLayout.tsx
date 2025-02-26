import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <Header />

      <main className="container-hand flex-grow py-4">{children}</main>

      <Footer />
    </div>
  );
}
