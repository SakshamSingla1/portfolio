import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../atoms/ProjectCard";
import { type IProject } from "../../services/useProfileMasterService";

interface ProjectGridProps {
  projects: IProject[];
  className?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  className = "",
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        No projects available at the moment.
      </div>
    );
  }

  return (
    <motion.div
      className={`grid gap-8 grid-cols-1 lg:grid-cols-2 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {projects.map((project, index) => (
        <motion.div key={project.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
