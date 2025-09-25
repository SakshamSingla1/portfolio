import { Spotlight } from "../atoms/Spotlight";
import SkillGlobe from "../atoms/SkillGlobe";
import SkillCard from "../atoms/SkillCard";
import { type ISkill } from "../../services/useProfileMasterService";
import { SKILL_CATEGORY_OPTIONS } from "../../utils/constant";
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

interface SkillsProps {
  skills: ISkill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Group skills by category
  const skillsByCategory = SKILL_CATEGORY_OPTIONS.reduce<Record<string, ISkill[]>>((acc, option) => {
    acc[option.value] = skills.filter(skill => skill.category === option.value);
    return acc;
  }, {});

  const classes = useStyles();

  return (
    <section className="relative py-20 px-4 sm:px-6">
      {/* Spotlight Effects */}
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#FFBC5E" />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="#76D1FF" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#FFBC5E" />
      
      <div className="w-full max-w-7xl mx-auto">
        <SkillGlobe logoUrls={skills.map(skill => skill.logoUrl || '')} />

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${classes.textGradient}`}>
            My Skills & Expertise
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I've worked with to create amazing digital experiences
          </p>
          <div className={`w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full ${classes.separator}`} />
        </div>

        <div className="space-y-20">

          {/* Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) =>
              categorySkills.length > 0 && (
                <div key={category} className="h-full">
                  <SkillCard
                    title={category}
                    skills={categorySkills}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
