import { readCms } from "@/lib/cms";
import { CmsShell } from "@/components/CmsShell";
import { ServicesClient } from "./ServicesClient";

export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const serverCms = readCms();
  return (
    <CmsShell serverCms={serverCms}>
      <ServicesClient />
    </CmsShell>
  );
}
