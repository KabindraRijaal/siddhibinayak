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
        "bg-white rounded-2xl overflow-hidden border border-gray-200 cursor-pointer group hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
        project.featured && "md:col-span-2"
      )}
      onClick={() => onOpen?.(project)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-xs">
            {project.category}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-head text-lg font-bold mb-1">{project.name}</h3>
        <div className="text-sm text-gray-500">
          📍 {project.location} · {project.year}
        </div>
        {project.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
        )}
      </div>
    </article>
  );
}
