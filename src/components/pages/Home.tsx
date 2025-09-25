import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import MagicButton from "../ui/magic-button";
import { type IProfile } from "../../services/useProfileMasterService";
import { createUseStyles } from "react-jss";
import { COLORS } from "../../utils/constant";
import { Spotlight } from "../atoms/Spotlight";

const useStyles = createUseStyles({
  profileImageWrapper: {
    padding: "4px",
    background: COLORS.primaryGradient,
    borderRadius: "2rem",
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
  },
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
    margin: "0.5rem 0",
  },
  buttonGroup: {
    display: "flex",
    gap: "1.5rem",
    marginTop: "2.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
    "@media (min-width: 768px)": {
      justifyContent: "flex-start",
    },
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.3s ease",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "&:hover": {
      transform: "translateX(5px)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  socialIcon: {
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
    },
  },
});

interface HeroProps {
  profile: IProfile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const classes = useStyles();

  return (
    <section className="min-h-screen relative flex flex-col justify-start pt-24 px-4 sm:px-6 pb-12 md:pb-16 lg:pb-20 overflow-hidden">
      {/* Spotlights */}
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#FFBC5E" />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="#76D1FF" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#FFBC5E" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Profile Image */}
          <div className="lg:col-span-4 xl:col-span-3 flex justify-center lg:justify-end">
            {profile.profileImageUrl && (
              <motion.div
                className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
                initial={{ scale: 0.9, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={classes.profileImageWrapper}>
                  <img
                    src={profile.profileImageUrl}
                    alt={profile.fullName}
                    className="w-full h-full rounded-3xl object-cover border-4 border-slate-900"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8 xl:col-span-6 flex flex-col justify-center">
            {/* Name */}
            <motion.div
              className="mb-4 md:mb-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TextGenerateEffect
                words={profile.fullName || ""}
                className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${classes.textGradient} mb-2`}
              />
              <div className={classes.separator}></div>
            </motion.div>

            {/* Title */}
            {profile.title && (
              <motion.div
                className="text-xl md:text-2xl text-gray-300 mb-4 md:mb-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {profile.title}
              </motion.div>
            )}

            {/* Contact Info */}
            <motion.div
              className="flex flex-col items-start lg:justify-start gap-3 text-gray-300 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {profile.email && (
                <a href={`mailto:${profile.email}`} className={classes.contactItem}>
                  <FaEnvelope className="text-blue-400" />
                  <span className="text-sm md:text-base">{profile.email}</span>
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className={classes.contactItem}>
                  <FaPhone className="text-green-400" />
                  <span className="text-sm md:text-base">{profile.phone}</span>
                </a>
              )}
              {profile.location && (
                <div className={classes.contactItem}>
                  <FaMapMarkerAlt className="text-red-400" />
                  <span className="text-sm md:text-base">{profile.location}</span>
                </div>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-5 md:gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl text-gray-300 hover:text-white transition-colors ${classes.socialIcon}`}
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl text-gray-300 hover:text-blue-400 transition-colors ${classes.socialIcon}`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
              {profile.websiteUrl && (
                <a
                  href={profile.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl text-gray-300 hover:text-purple-400 transition-colors ${classes.socialIcon}`}
                  aria-label="Personal Website"
                >
                  <FaGlobe />
                </a>
              )}
            </motion.div>
          </div>
        </div>

        {/* About Me */}
        {profile.aboutMe && (
          <motion.div
            className="max-w-7xl mx-auto text-base md:text-lg leading-relaxed bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">About Me</h3>
            <TextGenerateEffect words={profile.aboutMe} className="text-gray-200" />

            <div className={classes.buttonGroup}>
              {profile.email && (
                <MagicButton
                  text="Get in Touch"
                  icon="email"
                  variant="primary"
                  href={`mailto:${profile.email}`}
                  className="px-6 py-3 text-sm sm:text-base font-medium"
                />
              )}
              {profile.resumeUrl && (
                <MagicButton
                  text="View Resume"
                  icon="download"
                  variant="secondary"
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-sm sm:text-base font-medium"
                />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
