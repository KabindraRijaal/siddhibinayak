import { readCms } from "@/lib/cms";
import { CmsShell } from "@/components/CmsShell";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const serverCms = readCms();
  return (
    <CmsShell serverCms={serverCms}>
      <HomeClient />
    </CmsShell>
  );
}
