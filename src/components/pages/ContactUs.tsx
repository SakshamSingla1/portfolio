import { useState } from "react";
import { Spotlight } from "../atoms/Spotlight";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import ContactForm from "../atoms/ContactForm";
import { type ContactUsRequest } from "../../services/useContactUsService";
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

interface ContactUsProps {
  profileId: string;
}

const ContactUs: React.FC<ContactUsProps> = ({ profileId }) => {
    const classes = useStyles();
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const initialFormData: ContactUsRequest = {
    name: "",
    email: "",
    phone: "",
    message: "",
    profileId: profileId
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 min-h-screen flex items-center"
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

      <div className="w-full max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-[${classes.textGradient}] mb-6 shadow-lg`}>
            <FaPaperPlane className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${classes.textGradient}`}>
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Send me a message!
          </p>
          <div className={`w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full ${classes.separator}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {submitStatus ? (
            <div className={`p-6 text-center ${submitStatus.success ? "text-green-600" : "text-red-600"}`}>
              <p className="text-lg font-medium">{submitStatus.message}</p>
              {submitStatus.success && (
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Another Message
                </button>
              )}
            </div>
          ) : (
            <ContactForm
                profileId={profileId}
            />
          )}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-20 right-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl" />
    </section>
  );
};

export default ContactUs;
