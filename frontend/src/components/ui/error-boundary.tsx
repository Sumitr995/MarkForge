import { Component, type ReactNode } from "react";
import { Button } from "./button";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; msg: string }> {
  state = { hasError: false, msg: "" };
  static getDerivedStateFromError(e: unknown) {
    return { hasError: true, msg: e instanceof Error ? e.message : "Something went wrong" };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-[640px] px-6 py-16 text-center">
          <div className="font-mono text-[11px] tracking-widest uppercase text-mute">Something broke</div>
          <h1 className="mt-2 font-mono text-[18px] font-bold text-ink">We hit an error</h1>
          <p className="mt-2 font-mono text-[12.5px] leading-5 text-body break-words">{this.state.msg}</p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="primary" onClick={() => location.reload()}>Reload</Button>
            <Button variant="secondary" onClick={() => (location.href = "/")}>Go home</Button>
          </div>
          <div className="mt-6 rounded-[4px] border border-hairline bg-surface-card p-3 text-left font-mono text-[11px] text-mute">If this keeps happening, email support@markforge.app with the URL and time.</div>
        </div>
      );
    }
    return this.props.children;
  }
}
