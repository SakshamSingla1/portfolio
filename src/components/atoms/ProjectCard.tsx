import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type IProject } from "../../services/useProfileMasterService";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiInfo,
  FiCode,
  FiCalendar,
  FiImage,
} from "react-icons/fi";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { htmlToElement } from "../../utils/helper";
import { COLORS } from "../../utils/constant";

interface ProjectCardProps {
  project: IProject;
  className?: string;
  onViewDetails?: (projectId: string) => void;
}

const formatDate = (dateString: string | Date | null): string => {
  if (!dateString) return "Present";
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return format(date, "MMM yyyy");
};

const isProjectActive = (
  startDate: string | Date,
  endDate: string | Date | null
): boolean => {
  if (!endDate) return true;
  const now = new Date();
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;
  return isAfter(now, start) && isBefore(now, end);
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = "",
  onViewDetails,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const handleImageError = () => {
    setImgError(true);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewDetails && project.id) {
      onViewDetails(project.id.toString());
    } else {
      setIsModalOpen(true);
    }
  };

  const renderTechStack = () => {
    if (!project.technologiesUsed?.length) return null;

    return (
      <div>
        <h4
          className="text-xs font-medium mb-2 flex items-center gap-1"
          style={{ color: COLORS.gray }}
        >
          <FiCode className="w-3.5 h-3.5" />
          <span>Technologies</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.technologiesUsed.map((tech, i) => (
            <div
              key={`${tech.logoName}-${i}`}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
              style={{
                background: COLORS.darkShade1,
                color: COLORS.offWhite,
                border: `1px solid ${COLORS.darkShade2}`,
              }}
              title={tech.logoName}
            >
              <img src={tech.logoUrl} alt={tech.logoName} className="w-4 h-4" />
              {tech.logoName}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjectDates = () => {
    const startDate = project.projectStartDate
      ? formatDate(project.projectStartDate)
      : null;
    const endDate =
      project.currentlyWorking || !project.projectEndDate
        ? "Present"
        : formatDate(project.projectEndDate);

    const isActive =
      project.currentlyWorking ||
      isProjectActive(project.projectStartDate, project.projectEndDate);

    return (
      <div>
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: COLORS.gray }}
        >
          <FiCalendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            {startDate} - {endDate}
          </span>
          {isActive && (
            <span
              className="flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                background: "rgba(34,197,94,0.1)",
                color: "rgb(74,222,128)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Active
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={container}
      className={`relative h-full w-full transition-all duration-300 ${className}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleViewDetails}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.projectName}`}
    >
      <motion.div
        className="h-full w-full rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
        style={{ background: COLORS.secondaryGradient }}
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Image */}
        <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden group">
          {!imgError && project.projectImageUrl ? (
            <>
              <motion.img
                src={project.projectImageUrl}
                alt={project.projectName}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsImageLoaded(true)}
                onError={handleImageError}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              {!isImageLoaded && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{ background: COLORS.darkShade1 }}
                />
              )}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)",
                }}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: isHovered ? 0.8 : 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: COLORS.secondaryGradient }}
            >
              <span style={{ color: COLORS.gray }} className="text-sm">
                No preview available
              </span>
            </div>
          )}

          <div className="absolute top-2 right-2 flex items-center gap-2">
            {project.projectLink && (
              <motion.a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-sm transition-colors"
                style={{
                  background: COLORS.darkShade1,
                  border: `1px solid ${COLORS.darkShade2}`,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub style={{ color: COLORS.offWhite }} />
              </motion.a>
            )}
            {project.projectLink && (
              <motion.a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-sm transition-colors"
                style={{
                  background: COLORS.darkShade1,
                  border: `1px solid ${COLORS.darkShade2}`,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink style={{ color: COLORS.offWhite }} />
              </motion.a>
            )}
          </div>

          <div className="absolute bottom-0 left-0 backdrop-blur-sm p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3
                  className="text-lg md:text-xl font-bold line-clamp-1"
                  style={{
                    background: COLORS.textGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {project.projectName}
                </h3>
                {renderProjectDates()}
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-2 right-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered || isMobile ? 1 : 0,
              y: isHovered || isMobile ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="flex items-center gap-2 px-2 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: COLORS.light,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(e);
              }}
            >
              <FiInfo className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        <div className="p-5 md:p-6">{renderTechStack()}</div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative rounded-2xl w-full max-w-5xl mx-auto my-8 overflow-hidden shadow-2xl"
              style={{
                background: COLORS.secondaryGradient,
                border: `1px solid ${COLORS.darkShade2}`,
              }}
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 shadow-lg"
                style={{
                  background: COLORS.darkShade1,
                  color: COLORS.offWhite,
                  border: `1px solid ${COLORS.darkShade2}`,
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(false)}
              >
                <FiX className="w-5 h-5" />
              </motion.button>

              {/* Header */}
              <div
                className="relative h-64 md:h-96 w-full overflow-hidden"
                style={{ background: COLORS.secondaryGradient }}
              >
                {project.projectImageUrl && !imgError ? (
                  <motion.img
                    src={project.projectImageUrl}
                    alt={project.projectName}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiImage style={{ color: COLORS.gray }} className="w-8 h-8" />
                  </div>
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 backdrop-blur-sm">
                  <h2
                    className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg"
                    style={{ color: COLORS.light }}
                  >
                    {project.projectName}
                  </h2>
                  {renderProjectDates()}
                </div>
              </div>

              {/* Content */}
              <div
                className="p-6 md:p-8 overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 28rem)" }}
              >
                {project.projectDescription && (
                  <div className="mb-8">
                    <h3
                      className="text-lg font-semibold mb-3 pb-2 border-b"
                      style={{
                        color: COLORS.offWhite,
                        borderColor: COLORS.darkShade2,
                      }}
                    >
                      Project Overview
                    </h3>
                    <div
                      className="leading-relaxed space-y-4"
                      style={{ color: COLORS.gray }}
                    >
                      {htmlToElement(project.projectDescription)}
                    </div>
                  </div>
                )}

                {project.technologiesUsed?.length > 0 && (
                  <div className="mb-8">
                    <h3
                      className="text-lg font-semibold mb-3 pb-2 border-b"
                      style={{
                        color: COLORS.offWhite,
                        borderColor: COLORS.darkShade2,
                      }}
                    >
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologiesUsed.map((tech, i) => (
                        <motion.span
                          key={`tech-${i}`}
                          className="px-3 py-1.5 text-xs rounded-lg flex items-center gap-2 transition-all"
                          style={{
                            background: COLORS.darkShade1,
                            color: COLORS.offWhite,
                            border: `1px solid ${COLORS.darkShade2}`,
                          }}
                        >
                          {tech.logoUrl && (
                            <img
                              src={tech.logoUrl}
                              alt={tech.logoName}
                              className="w-4 h-4 object-contain"
                              onError={(e) =>
                                ((e.target as HTMLImageElement).style.display =
                                  "none")
                              }
                            />
                          )}
                          <span>{tech.logoName}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {project.projectLink && (
                  <div className="pt-4 border-t" style={{ borderColor: COLORS.darkShade2 }}>
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ color: COLORS.offWhite }}
                    >
                      Project Links
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <motion.a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background: COLORS.primaryGradient,
                          color: COLORS.darkest,
                        }}
                      >
                        <FiGithub />
                        <span>View on GitHub</span>
                      </motion.a>

                      <motion.a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background: COLORS.accentGradient1,
                          color: COLORS.darkest,
                        }}
                      >
                        <FiExternalLink />
                        <span>Live Demo</span>
                      </motion.a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCard;
