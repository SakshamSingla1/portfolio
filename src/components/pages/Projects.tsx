import { type IProject } from "../../services/useProfileMasterService";
import { Spotlight } from "../atoms/Spotlight";
import { motion } from "framer-motion";
import ProjectGrid from "../molecules/ProjectGrid";
import { FaCode } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import { COLORS } from "../../utils/constant";

const useStyles = createUseStyles({
    textGradient: {
      background: COLORS.textGradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    separator: {
      width: "6rem",
      height: "0.25rem",
      borderRadius: "999px",
      background: COLORS.textGradient,
    },
});

interface ProjectsProps {
    projects: IProject[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = [] }) => {
    const classes = useStyles();
    if (!projects.length) {
        return (
            <section 
                id="projects" 
                className="relative py-20 px-4 sm:px-6 min-h-screen flex items-center justify-center"
            >
                <div className="w-full max-w-7xl mx-auto text-center">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${classes.textGradient}`}>
                        My Projects
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        No projects available at the moment. Check back soon!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section 
            id="projects" 
            className="relative py-20 px-4 sm:px-6 min-h-screen"
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl" />
            </div>

            {/* Spotlight Effects */}
            <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#FFBC5E" />
            <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="#76D1FF" />
            <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#FFBC5E" />

            <div className="w-full max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-[${classes.textGradient}] mb-6 shadow-lg`}>
                        <FaCode className="w-8 h-8 text-white" />
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${classes.textGradient}`}>
                        My Projects
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        A collection of my work and contributions
                    </p>
                    <div className={`w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full ${classes.separator}`} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <ProjectGrid projects={projects} />
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -bottom-20 right-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl" />
            </div>
        </section>
    );
};

export default Projects;