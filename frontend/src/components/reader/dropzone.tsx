import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileText, Loader2, ShieldCheck, Clock3, X } from "lucide-react";
import { MAX_FILE_SIZE_MB, GUEST_DAILY_LIMIT } from "@/lib/constants";
import { uploadPdf, ApiError } from "@/lib/api";
import { useDocumentStore } from "@/stores/document-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Dropzone() {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const setDoc = useDocumentStore((s) => s.setDoc);
  const navigate = useNavigate();

  const validate = (f: File) => {
    if (f.type !== "application/pdf") {
      toast.error("Only PDF files are allowed", { description: "We currently support PDFs up to 20 MB. Images and DOCX coming soon." });
      return false;
    }
    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large — max ${MAX_FILE_SIZE_MB} MB`, { description: "Try compressing or splitting the PDF." });
      return false;
    }
    return true;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files?.[0]) return;
    const f = files[0];
    if (!validate(f)) return;
    setFile(f);
  }, []);

  const doUpload = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(12);
    const t1 = setTimeout(() => setProgress(36), 600);
    const t2 = setTimeout(() => setProgress(68), 1800);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await uploadPdf(file, controller.signal);
      setProgress(100);
      setDoc(res.data);
      toast.success("Distilled — opening reader", { description: `${res.data.originalName} · ${(res.data.markdown.length / 1000).toFixed(1)}k chars` });
      navigate("/reader");
    } catch (e: unknown) {
      const msg = e instanceof ApiError ? e.message : e instanceof Error ? e.message : "Upload failed";
      const status = e instanceof ApiError ? e.status : undefined;
      if (status === 429) toast.error("Daily limit reached", { description: `Free plan: ${GUEST_DAILY_LIMIT}/day. Try tomorrow or join Pro waitlist.` });
      else if (status === 413) toast.error(msg);
      else toast.error("Could not distill PDF", { description: msg });
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setLoading(false);
      setTimeout(() => setProgress(0), 800);
      abortRef.current = null;
    }
  };

  const handleSample = async () => {
    if (loading) return;
    setLoading(true);
    setProgress(12);
    const t1 = setTimeout(() => setProgress(36), 600);
    const t2 = setTimeout(() => setProgress(68), 1800);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      // public/demo/Sumit_Resume.pdf is served at /demo/Sumit_Resume.pdf in both dev and prod
      const res = await fetch("/demo/Sumit_Resume.pdf");
      if (!res.ok) throw new Error("Failed to load sample PDF");
      const blob = await res.blob();
      const sampleFile = new File([blob], "Sumit_Resume.pdf", { type: "application/pdf" });
      setFile(sampleFile);
      setProgress(68);
      const uploadRes = await uploadPdf(sampleFile, controller.signal);
      setProgress(100);
      setDoc(uploadRes.data);
      toast.success("Sample distilled — opening reader", { description: `${uploadRes.data.originalName} · ${(uploadRes.data.markdown.length / 1000).toFixed(1)}k chars` });
      navigate("/reader");
    } catch (e: unknown) {
      const msg = e instanceof ApiError ? e.message : e instanceof Error ? e.message : "Sample upload failed";
      toast.error("Could not load sample", { description: msg });
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setLoading(false);
      setTimeout(() => setProgress(0), 800);
      abortRef.current = null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => !file && inputRef.current?.click()}
        className={cn(
          "group relative flex flex-col items-center justify-center rounded-[4px] border-2 border-dashed bg-surface-soft px-6 py-10 sm:py-14 text-center transition-colors",
          !file && "cursor-pointer",
          dragOver ? "border-ink bg-canvas" : "border-hairline hover:border-hairline-strong hover:bg-canvas",
          loading && "opacity-80"
        )}
      >
        <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFiles(e.target.files)} />

        <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-ink text-canvas">
          {loading ? <Loader2 className="animate-spin" size={20} /> : file ? <FileText size={20} /> : <Upload size={20} />}
        </div>

        {!file ? (
          <>
            <div className="mt-4 font-mono text-[14px] font-bold text-ink">Drop PDF here, or click to browse</div>
            <div className="mt-1 font-mono text-[12px] text-mute">PDF only · {MAX_FILE_SIZE_MB} MB max · deleted after processing</div>
            <div className="mt-3 inline-flex gap-2 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-[4px] border border-hairline bg-canvas px-2 py-1 text-mute"><ShieldCheck size={12} /> Private</span>
              <span className="inline-flex items-center gap-1 rounded-[4px] border border-hairline bg-canvas px-2 py-1 text-mute"><Clock3 size={12} /> ~20s for 30 pages</span>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 font-mono text-[13px] font-bold text-ink truncate max-w-[300px]">{file.name}</div>
            <div className="mt-1 font-mono text-[11px] text-mute">{(file.size / 1024 / 1024).toFixed(2)} MB · ready to distill</div>
            {loading && (
              <div className="mt-4 w-full max-w-[320px]">
                <div className="h-1.5 w-full rounded-full bg-hairline overflow-hidden"><div className="h-full bg-ink transition-all duration-700" style={{ width: `${progress}%` }} /></div>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-mute"><span>Extracting → classifying → enhancing</span><span>{progress}%</span></div>
              </div>
            )}
            <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Button variant="primary" onClick={doUpload} disabled={loading}>{loading ? "Distilling…" : "Distill →"}</Button>
              <Button variant="secondary" onClick={() => setFile(null)} disabled={loading}>Remove</Button>
              {loading && (
                <Button variant="ghost" onClick={() => abortRef.current?.abort()} title="Cancel">
                  <X size={14} className="mr-1" /> Cancel
                </Button>
              )}
            </div>
          </>
        )}
        {dragOver && <div className="absolute inset-2 rounded-[4px] border border-ink pointer-events-none" />}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-mute">
        <span>Free: {GUEST_DAILY_LIMIT}/day · Pro: 100/mo · <a href="#pricing" className="underline underline-offset-4 hover:text-ink">Pricing →</a></span>
        <button onClick={handleSample} disabled={loading} className="underline underline-offset-4 hover:text-ink disabled:opacity-50">Need sample PDF? Try Sumit_Resume.pdf →</button>
      </div>
    </div>
  );
}
