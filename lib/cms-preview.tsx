"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CmsState } from "./cms-types";

const CmsPreviewContext = createContext<CmsState | null>(null);

export function CmsPreviewProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<CmsState | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (
        e.data &&
        typeof e.data === "object" &&
        e.data.type === "cms-preview-update"
      ) {
        setPreview(e.data.cms as CmsState);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <CmsPreviewContext.Provider value={preview}>
      {children}
    </CmsPreviewContext.Provider>
  );
}

export function useCmsPreview(): CmsState | null {
  return useContext(CmsPreviewContext);
}
