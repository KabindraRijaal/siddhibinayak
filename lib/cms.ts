import "server-only";
import fs from "fs";
import path from "path";

export type {
  StatItem,
  ServiceItem,
  Project,
  Testimonial,
  TeamMember,
  FaqItem,
  TimelineItem,
  NavItem,
  CmsState,
} from "./cms-types";
export { DEFAULTS } from "./cms-types";

import type { CmsState } from "./cms-types";
import { DEFAULTS } from "./cms-types";

const CMS_FILE = path.join(process.cwd(), "data", "cms.json");

export function readCms(): CmsState {
  try {
    const raw = fs.readFileSync(CMS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CmsState>;
    const base = JSON.parse(JSON.stringify(DEFAULTS)) as CmsState;
    return deepMerge(base as unknown as Record<string, unknown>, parsed as unknown as Record<string, unknown>) as unknown as CmsState;
  } catch {
    return JSON.parse(JSON.stringify(DEFAULTS)) as CmsState;
  }
}

export function writeCms(state: CmsState): void {
  const dir = path.dirname(CMS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const tmp = CMS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2), "utf-8");
  fs.renameSync(tmp, CMS_FILE);
}

function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const k in source) {
    const sv = source[k];
    const tv = target[k];
    if (sv !== null && typeof sv === "object" && !Array.isArray(sv) && typeof tv === "object" && !Array.isArray(tv)) {
      (result as Record<string, unknown>)[k] = deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>);
    } else if (sv !== undefined) {
      (result as Record<string, unknown>)[k] = sv;
    }
  }
  return result;
}
