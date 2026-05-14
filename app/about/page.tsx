import { readCms } from "@/lib/cms";
import { CmsShell } from "@/components/CmsShell";
import { AboutClient } from "./AboutClient";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const serverCms = readCms();
  return (
    <CmsShell serverCms={serverCms}>
      <AboutClient />
    </CmsShell>
  );
}
