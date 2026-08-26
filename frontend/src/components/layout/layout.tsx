import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Toaster } from "sonner";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
