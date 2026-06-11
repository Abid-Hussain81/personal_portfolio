import {
  Briefcase,
  Code2,
  Layers,
  Layout,
  Mail,
  PenTool,
  Rocket,
  Shield,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/data/services";

export const serviceIconMap: Record<ServiceIconName, LucideIcon> = {
  code: Code2,
  layout: Layout,
  rocket: Rocket,
  briefcase: Briefcase,
  "pen-tool": PenTool,
  layers: Layers,
  mail: Mail,
  shield: Shield,
  wrench: Wrench,
};
