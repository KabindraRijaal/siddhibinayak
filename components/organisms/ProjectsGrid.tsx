"use client";

import { useMemo, useState } from "react";
import { ProjectCard, type Project } from "@/components/molecules/ProjectCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectsGridProps {
  projects: Project[];
  showFilter?: boolean;
}

export function ProjectsGrid({ projects, showFilter = true }: ProjectsGridProps) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  return (
    <>
      {showFilter && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 border-[1.5px] ${
                filter === c
                  ? "bg-primary border-primary text-white"
                  : "bg-transparent border-[#cdd5e3] text-[#3e4a5e] hover:bg-gray-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {shown.map((p) => (
          <ProjectCard key={p.name} project={p} onOpen={setSelected} />
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        {selected && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-head text-xl font-bold">
                {selected.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">Category</span>
                <p className="mt-0.5">{selected.category}</p>
              </div>
              <div>
                <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">Location</span>
                <p className="mt-0.5">📍 {selected.location}</p>
              </div>
              {selected.year && (
                <div>
                  <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">Year</span>
                  <p className="mt-0.5">{selected.year}</p>
                </div>
              )}
              {selected.area && (
                <div>
                  <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">Area</span>
                  <p className="mt-0.5">{selected.area}</p>
                </div>
              )}
              {selected.duration && (
                <div>
                  <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">Duration</span>
                  <p className="mt-0.5">{selected.duration}</p>
                </div>
              )}
              {selected.description && (
                <div>
                  <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">Description</span>
                  <p className="mt-0.5 leading-relaxed">{selected.description}</p>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
