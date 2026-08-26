import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function headingId(children: React.ReactNode): string {
  const text = String(children ?? "")
    .replace(/[*_`]/g, "")
    .trim();
  return slug(text) || "section";
}

export function MarkdownView({ markdown }: { markdown: string }) {
  return (
    <article className="prose-mono max-w-none scroll-mt-20">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children, ...props }) => {
            const id = headingId(children);
            return (
              <h1 id={id} className="font-mono text-[22px] font-bold text-ink mt-8 mb-3 leading-tight border-b border-hairline pb-2 scroll-mt-20" {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const id = headingId(children);
            return (
              <h2 id={id} className="font-mono text-[17px] font-bold text-ink mt-7 mb-2 scroll-mt-20 flex items-center gap-2" {...props}>
                <span className="hidden sm:inline-block h-px w-4 bg-hairline" />
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const id = headingId(children);
            return (
              <h3 id={id} className="font-mono text-[13px] font-bold tracking-wide uppercase text-ink mt-6 mb-2 scroll-mt-20" {...props}>
                {children}
              </h3>
            );
          },
          p: (props) => <p className="font-mono text-[13.5px] leading-6 text-body my-3" {...props} />,
          a: (props) => <a className="text-ink underline decoration-hairline-strong underline-offset-4 hover:text-accent hover:decoration-accent" {...props} />,
          ul: (props) => <ul className="my-3 space-y-1.5 list-disc pl-6 font-mono text-[13px] text-body marker:text-mute" {...props} />,
          ol: (props) => <ol className="my-3 space-y-1.5 list-decimal pl-6 font-mono text-[13px] text-body marker:text-mute" {...props} />,
          li: (props) => <li className="leading-6" {...props} />,
          blockquote: (props) => (
            <blockquote className="my-4 border-l-2 border-ink bg-surface-soft px-4 py-3 font-mono text-[13px] text-body" {...props} />
          ),
          code: ({ children, ...props }) => {
            const isInline = !String(children).includes("\n");
            if (isInline) {
              return (
                <code className="rounded-[4px] bg-surface-card border border-hairline px-1.5 py-0.5 font-mono text-[12px] text-ink" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="font-mono text-[12.5px]" {...props}>
                {children}
              </code>
            );
          },
          pre: (props) => <pre className="my-4 overflow-auto rounded-[4px] border border-hairline bg-surface-card p-4" {...props} />,
          table: (props) => (
            <div className="my-4 overflow-auto rounded-[4px] border border-hairline">
              <table className="w-full text-left font-mono text-[12.5px]" {...props} />
            </div>
          ),
          th: (props) => <th className="bg-surface-soft px-3 py-2 font-bold text-ink border-b border-hairline" {...props} />,
          td: (props) => <td className="px-3 py-2 border-b border-hairline text-body" {...props} />,
          hr: (props) => <hr className="my-6 border-hairline" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
