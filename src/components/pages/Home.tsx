import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
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
    boxShadow: `0 0 20px ${COLORS.highlight}`,
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
    margin: "0.75rem auto",
    "@media (min-width: 1024px)": {
      margin: "0.75rem 0",
    },
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
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
    backgroundColor: COLORS.darkShade2,
    "&:hover": {
      transform: "translateX(5px)",
      backgroundColor: COLORS.secondary,
    },
  },
  socialIcon: {
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      color: COLORS.highlight,
    },
  },
});

interface HeroProps {
  profile: IProfile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const classes = useStyles();

  return (
    <section className="min-h-screen relative flex flex-col justify-start pt-20 px-4 sm:px-6 lg:px-8 pb-12 overflow-hidden bg-[COLORS.darkest]">
      {/* Spotlights */}
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill={COLORS.highlight} />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill={COLORS.primary} />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill={COLORS.gold} />

      <div className="relative z-10 w-full max-w-7xl mx-auto mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Profile Image */}
          <div className="lg:col-span-4 xl:col-span-3 flex justify-center lg:justify-end">
            {profile.profileImageUrl && (
              <motion.div
                className="relative w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
                initial={{ scale: 0.9, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={classes.profileImageWrapper}>
                  <img
                    src={profile.profileImageUrl}
                    alt={profile.fullName}
                    className="w-full h-full rounded-3xl object-cover border-4"
                    style={{ borderColor: COLORS.darkest }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="lg:col-span-8 xl:col-span-6 flex flex-col items-center lg:items-start">
            {/* Name */}
            <motion.div
              className="mb-4 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TextGenerateEffect
                words={profile.fullName || ""}
                className={`text-3xl md:text-5xl font-extrabold leading-tight ${classes.textGradient}`}
              />
              <div className={classes.separator}></div>
            </motion.div>

            {/* Title */}
            {profile.title && (
              <motion.div
                className="text-lg md:text-xl text-gray-300 mb-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {profile.title}
              </motion.div>
            )}

            {/* Contact Info */}
            <motion.div
              className="flex flex-col items-start gap-3 text-gray-300 mb-8 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {profile.email && (
                <a href={`mailto:${profile.email}`} className={classes.contactItem}>
                  <FaEnvelope className="text-blue-400" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className={classes.contactItem}>
                  <FaPhone className="text-green-400" />
                  <span>{profile.phone}</span>
                </a>
              )}
              {profile.location && (
                <div className={classes.contactItem}>
                  <FaMapMarkerAlt className="text-red-400" />
                  <span>{profile.location}</span>
                </div>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={classes.socialIcon}>
                  <FaGithub size={28} />
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className={classes.socialIcon}>
                  <FaLinkedin size={28} />
                </a>
              )}
              {profile.websiteUrl && (
                <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className={classes.socialIcon}>
                  <FaGlobe size={28} />
                </a>
              )}
            </motion.div>
          </div>
        </div>

        {/* About Me */}
        {profile.aboutMe && (
          <motion.div
            className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed bg-[rgba(0,0,0,0.3)] backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border mt-12"
            style={{ borderColor: COLORS.grayTransparent }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.light }}>
              About Me
            </h3>
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
