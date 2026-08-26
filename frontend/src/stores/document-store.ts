import { create } from "zustand";

export interface DocumentData {
  originalName: string;
  markdown: string;
  assets: { type: string; path: string; page: number }[];
}

interface DocumentStore {
  doc: DocumentData | null;
  setDoc: (doc: DocumentData) => void;
  clear: () => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  doc: null,
  setDoc: (doc) => set({ doc }),
  clear: () => set({ doc: null }),
}));
