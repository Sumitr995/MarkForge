import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import HomePage from "@/pages/home";
import AppPage from "@/pages/app";
import ReaderPage from "@/pages/reader";
import DocsPage from "@/pages/docs";

function NotFound() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 text-center">
      <div className="font-mono text-[11px] tracking-widest uppercase text-mute">404</div>
      <h1 className="mt-2 font-mono text-[18px] font-bold text-ink">Page not found</h1>
      <p className="mt-2 font-mono text-[13px] text-body">The page you’re looking for doesn’t exist. Try the app or go home.</p>
      <div className="mt-6 flex justify-center gap-2">
        <a href="/app" className="rounded-[4px] bg-ink px-4 py-2 font-mono text-[13px] text-canvas">Open app →</a>
        <a href="/" className="rounded-[4px] border border-hairline bg-canvas px-4 py-2 font-mono text-[13px] text-ink">Go home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/reader" element={<ReaderPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
