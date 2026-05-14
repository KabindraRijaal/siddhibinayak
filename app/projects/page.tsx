import { readCms } from "@/lib/cms";
import { CmsShell } from "@/components/CmsShell";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const serverCms = readCms();
  return (
    <CmsShell serverCms={serverCms}>
      <ProjectsClient />
    </CmsShell>
  );
}
