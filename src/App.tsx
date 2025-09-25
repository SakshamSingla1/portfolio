import { useEffect, useRef, useState } from "react";
import { useProfileMasterService, type IProfileMaster } from "./services/useProfileMasterService";
import { FaBook, FaCode, FaDumbbell, FaEnvelope, FaHome } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { FloatingNav } from "./components/atoms/FloatingNavbar";
import Home from "./components/pages/Home";
import Skills from "./components/pages/Skills";
import { Spotlight } from "./components/atoms/Spotlight";
import Education from "./components/pages/Education";
import Experience from "./components/pages/Experience";
import Projects from "./components/pages/Projects";
import ContactUs from "./components/pages/ContactUs";

export const NAV_ITEMS = [
    { name: "Home", link: "/", icon: <FaHome /> },
    { name: "Skills", link: "/skills", icon: <FaDumbbell /> },
    { name: "Experience", link: "/experience", icon: <FaUpwork /> },
    { name: "Education", link: "/education", icon: <FaBook /> },
    { name: "Projects", link: "/projects", icon: <FaCode /> },
    { name: "Contact", link: "/contact", icon: <FaEnvelope /> },
];

// Single page sections
const sections = [
  { id: 'home', name: 'Home', icon: <FaHome /> },
  { id: 'skills', name: 'Skills', icon: <FaDumbbell /> },
  { id: 'experience', name: 'Experience', icon: <FaUpwork /> },
  { id: 'education', name: 'Education', icon: <FaBook /> },
  { id: 'projects', name: 'Projects', icon: <FaCode /> },
  { id: 'contact', name: 'Contact', icon: <FaEnvelope /> },
];

const App = () => {
  const profileMasterService = useProfileMasterService();
  const [profileMaster, setProfileMaster] = useState<IProfileMaster | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create ref callbacks
  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  useEffect(() => {
    profileMasterService.getProfileMaster().then((response) => {
      setProfileMaster(response.data.data);
    });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (!profileMaster) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Global Spotlights */}
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#FFBC5E" />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="#76D1FF" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#FFBC5E" />
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-grid-white/[0.05] bg-[length:40px_40px] -z-10" />
      
      {/* Decorative Elements */}
      <div className="fixed -bottom-20 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl -z-10" />
      <div className="fixed -top-20 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl -z-10" />
      {/* Navigation */}
      <FloatingNav 
        navItems={sections.map(section => ({
          ...section,
          link: `#${section.id}`,
        }))}
        onNavItemClick={(id) => scrollToSection(id.replace('#', ''))}
      />

      {/* Main Content */}
      <div ref={containerRef} className="relative z-10">
        {/* Home Section */}
        <section 
          id="home" 
          ref={setSectionRef('home')}
          className="min-h-screen flex items-center justify-center"
        >
          <Home profile={profileMaster.profile} />
        </section>
        

        {/* Skills Section */}
        <section 
          id="skills" 
          ref={setSectionRef('skills')}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <Skills skills={profileMaster.skills} />
          </div>
        </section>

        {/* Education Section */}
        <section 
          id="education" 
          ref={setSectionRef('education')}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <Education educations={profileMaster.educations} />
          </div>
        </section>

        {/* Experience Section */}
        <section 
          id="experience" 
          ref={setSectionRef('experience')}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <Experience experiences={profileMaster.experiences} />
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          ref={setSectionRef('projects')}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <Projects projects={profileMaster.projects} />
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          ref={setSectionRef('contact')}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <ContactUs profileId={profileMaster.profile.id || ""} />
          </div>
        </section>

        {/* Add more sections here following the same pattern */}
        {sections
          .filter(section => !['home', 'skills', 'education', 'experience', 'projects', 'contact'].includes(section.id))
          .map(section => (
            <section 
              key={section.id}
              id={section.id}
              ref={setSectionRef(section.id)}
              className="min-h-screen flex items-center justify-center py-20"
            >
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                  {section.name} Section
                </h2>
                <p className="text-center text-gray-300">
                  {section.name} content will go here
                </p>
              </div>
            </section>
          ))}
      </div>
    </div>
    );
};

export default App;