import { type IEducation } from "../../services/useProfileMasterService";
import { Spotlight } from "../atoms/Spotlight";
import { motion } from "framer-motion";
import EducationTimeline from "../molecules/EducationTimeline";
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


interface EducationProps {
    educations: IEducation[];
}

const Education: React.FC<EducationProps> = ({ educations = [] }) => {
    const classes = useStyles();
    if (!educations.length) {
        return (
            <section className="relative py-20 px-4 sm:px-6">
                <div className="w-full max-w-7xl mx-auto text-center">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${classes.textGradient}`}>
                        My Education
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        No education history available at the moment.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
            {/* Spotlight Effects */}
            <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#FFBC5E" />
            <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="#76D1FF" />
            <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#FFBC5E" />

            <div className="w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${classes.textGradient}`}>
                        My Education
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        My academic journey and qualifications that have shaped my career.
                    </p>
                    <div className={`w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full ${classes.separator}`} />
                </motion.div>

                <EducationTimeline educations={educations} />
            </div>
        </section>
    );
};

export default Education;