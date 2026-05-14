import { readCms } from "@/lib/cms";
import { CmsShell } from "@/components/CmsShell";
import { ContactClient } from "./ContactClient";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const serverCms = readCms();
  return (
    <CmsShell serverCms={serverCms}>
      <ContactClient />
    </CmsShell>
  );
}
