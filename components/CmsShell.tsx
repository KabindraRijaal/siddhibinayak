"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useCmsPreview } from "@/lib/cms-preview";
import type { CmsState } from "@/lib/cms-types";

const CmsContext = createContext<CmsState | null>(null);

interface CmsShellProps {
  serverCms: CmsState;
  children: ReactNode;
}

export function CmsShell({ serverCms, children }: CmsShellProps) {
  const preview = useCmsPreview();
  return (
    <CmsContext.Provider value={preview ?? serverCms}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms(): CmsState {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used inside CmsShell");
  return ctx;
}
