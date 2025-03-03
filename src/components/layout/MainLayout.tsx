import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import ScrollToTop from "../ui/ScrollToTop";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <Header />

      <main className="container-hand flex-grow py-4">
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
