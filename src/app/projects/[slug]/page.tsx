import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: "项目不存在 · 黄栋斐" };
  return { title: `${project.title} · 黄栋斐`, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
