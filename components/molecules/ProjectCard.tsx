"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Project {
  name: string;
  category: string;
  location: string;
  type?: string;
  year: string | number;
  image?: string;
  featured?: boolean;
  description?: string;
  area?: string;
  duration?: string;
}

interface ProjectCardProps {
  project: Project;
  onOpen?: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "bg-[#f8f9fa] rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300",
        project.featured && "md:col-span-2"
      )}
      onClick={() => onOpen?.(project)}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#6b7585] font-mono text-[11px] bg-linear-to-br from-[#e7e8e9] to-[#d9dadb]">
            {project.category} photo
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white text-[11px] font-bold uppercase tracking-[0.06em] px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-head text-[18px] font-bold mb-2">{project.name}</h3>
        <div className="text-[13px] text-[#4a5568] flex items-center gap-1.5 mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {project.location}
        </div>
        <div className="flex justify-between text-[12px] text-[#3e4a5e] border-t border-[#cdd5e3] pt-3">
          <span>{project.type ?? project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </article>
  );
}
