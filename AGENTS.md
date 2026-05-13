<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AI Agent Instructions for Siddhibinayak Project

These are specific project instructions for AI coding agents to remain highly productive.

## Project Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19.
- **Styling**: Tailwind CSS v4.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) library is used heavily. Components are located in `components/ui/`.
- **Icons**: Use `lucide-react`.

## Important Commands

- Run dev server: `npm run dev`
- Build project: `npm run build`
- Typecheck & Lint: `npm run lint`
- Add shadcn components: `npx shadcn@latest add <component-name>`

## Coding Conventions

- **Component Placement**: Shared UI goes into `components/ui/`, layout components into `components/`, and page-specific pieces collocated in the `app/` directory or appropriately structured features.
<!-- END:nextjs-agent-rules -->
