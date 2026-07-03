"use client";

import { useState } from "react";

type DocStatus = "active" | "processing" | "archived";

type KnowledgeDoc = {
  id: string;
  title: string;
  status: DocStatus;
  chunkCount: number;
};

// Placeholder data — real rows load from the knowledge_docs table once
// api/kb/upload exists. Standing in here so the table has something to show.
const MOCK_DOCS: KnowledgeDoc[] = [
  { id: "1", title: "js-array-methods.md", status: "active", chunkCount: 12 },
  { id: "2", title: "python-loops.md", status: "active", chunkCount: 8 },
  { id: "3", title: "dsa-recursion.md", status: "processing", chunkCount: 0 },
];

const STATUS_STYLES: Record<DocStatus, string> = {
  active: "bg-[var(--success)]",
  processing: "bg-[var(--warning)]",
  archived: "bg-[var(--surface-alt)]",
};

export default function AdminPage() {
  const [docs] = useState<KnowledgeDoc[]>(MOCK_DOCS);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--ink)]">Knowledge base</h1>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        Upload markdown or text docs for Explain mode to cite.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        className={`card-sticky card-sticky--ink mt-6 flex flex-col items-center justify-center gap-2 border-dashed p-10 text-center transition-colors ${
          isDragging ? "bg-[var(--bg-blue)]" : ""
        }`}
      >
        <p className="text-sm font-semibold text-[var(--ink)]">
          Drag & drop a .md or .txt file here
        </p>
        <p className="text-xs text-[var(--ink-muted)]">or</p>
        <label className="btn btn-secondary cursor-pointer text-sm">
          Choose file
          <input type="file" accept=".md,.txt" className="hidden" />
        </label>
        <p className="mt-3 text-xs text-[var(--ink-muted)]">
          Upload endpoint isn&rsquo;t wired up yet — api/kb/upload comes
          later. This is the shell.
        </p>
      </div>

      <div className="card-sticky card-sticky--ink mt-8 overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b-2 border-[var(--ink)] bg-[var(--surface-alt)]">
            <tr>
              <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                Title
              </th>
              <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                Status
              </th>
              <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                Chunks
              </th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-[var(--ink)]/10 last:border-0"
              >
                <td className="px-4 py-3 font-mono text-xs text-[var(--ink)]">
                  {doc.title}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full border border-[var(--ink)] px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[doc.status]}`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--ink)]">
                  {doc.chunkCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-[var(--ink-muted)]">
        Showing placeholder data — real docs will load from Supabase once
        api/kb/upload and the knowledge_docs table are connected.
      </p>
    </div>
  );
}