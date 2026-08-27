import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Toaster } from "sonner";
import { useTheme } from "@/lib/theme";

export function Layout({ children }: { children: React.ReactNode }) {
  const { resolved } = useTheme();
  return (
    <div className="min-h-dvh bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster
        theme={resolved}
        position="top-right"
        closeButton
        expand={false}
        visibleToasts={3}
        toastOptions={{
          duration: 3500,
          classNames: {
            toast: "group !bg-canvas !text-ink !border !border-hairline !rounded-[4px] !shadow-none font-mono",
            title: "!font-mono !text-[13px] !font-bold !text-ink",
            description: "!font-mono !text-[12px] !text-mute !leading-5",
            closeButton: "!bg-canvas !border !border-hairline !text-mute hover:!text-ink",
          },
        }}
      />
    </div>
  );
}
