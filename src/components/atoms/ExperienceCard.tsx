import React, { useState, useEffect } from 'react';
import { Code2, MapPin, Calendar, Clock } from 'lucide-react';
import { type IExperience, type ISkillDropdown } from '../../services/useProfileMasterService';
import { htmlToElement } from '../../utils/helper';
import { COLORS } from '../../utils/constant';

interface ExperienceCardProps {
  experience: IExperience;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience: {
    companyName,
    jobTitle,
    location,
    startDate,
    endDate,
    currentlyWorking,
    description,
    technologiesUsed,
  },
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatDateRange = (start: string, end?: string | null) => {
    if (currentlyWorking) {
      return `${start} - Present`;
    }
    return end ? `${start} - ${end}` : `${start} - Present`;
  };

  const getDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth() + years * 12;

    if (months >= 12) {
      const years = Math.floor(months / 12);
      return `${years}+ ${years === 1 ? 'year' : 'years'}`;
    }
    return `${months}+ months`;
  };

  return (
    <article
      className={`relative group overflow-hidden transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border */}
      <div
        className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isHovered ? 'animate-gradient-xy' : ''
        }`}
        style={{ background: COLORS.borderGradient }}
      />

      {/* Card background */}
      <div
        className="relative h-full rounded-xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden border"
        style={{
          background: COLORS.secondaryGradient,
          borderImage: `${COLORS.borderGradient} 1`,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        {/* Background accent gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl transition-all duration-700 scale-100"
            style={{ background: COLORS.accentGradient1 }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full blur-3xl transition-all duration-700 scale-100"
            style={{ background: COLORS.accentGradient2 }}
          />
        </div>

        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div
                  className={`absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-all duration-700 ${
                    isHovered ? 'animate-pulse' : ''
                  }`}
                  style={{ background: COLORS.primaryGradient }}
                />
                <div className="relative z-10 p-2.5 rounded-lg border shadow-lg"
                     style={{ background: COLORS.darkShade1, borderColor: COLORS.darkShade2 }}>
                  <Code2 className="w-6 h-6" style={{ color: COLORS.highlight }} />
                </div>
              </div>
              <div className="flex-1">
                <h2
                  className="text-xl sm:text-2xl font-bold"
                  style={{
                    background: COLORS.textGradient,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {companyName}
                </h2>
                <div className="flex items-center text-sm mt-1" style={{ color: COLORS.gray }}>
                  <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
            </div>
            <span
              className="inline-flex items-center justify-center sm:justify-start px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-sm whitespace-nowrap"
              style={{
                background: COLORS.accentGradient1,
                color: COLORS.light,
                border: `1px solid ${COLORS.highlight}`,
              }}
            >
              <Clock className="w-3 h-3 mr-1.5 flex-shrink-0" />
              {getDuration(startDate, endDate || undefined)}
            </span>
          </div>

          {/* Job Title & Dates */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold" style={{ color: COLORS.light }}>
              {jobTitle}
            </h3>
            <div className="flex items-center text-sm mt-2" style={{ color: COLORS.gray }}>
              <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
              <span>{formatDateRange(startDate, endDate || undefined)}</span>
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 mb-6 group/desc">
            <div
              className="pl-4 py-1 leading-relaxed border-l-2 transition-all duration-300 group-hover/desc:pl-5"
              style={{ color: COLORS.offWhite, borderImage: `${COLORS.primaryGradient} 1` }}
            >
              {htmlToElement(description)}
            </div>
          </div>

          {/* Technologies */}
          {technologiesUsed && technologiesUsed.length > 0 && (
            <div
              className="mt-auto pt-4 group/tech"
              style={{ borderTop: `1px solid ${COLORS.darkShade2}` }}
            >
              <h4
                className="text-xs font-medium mb-3 tracking-wider uppercase"
                style={{ color: COLORS.gray }}
              >
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologiesUsed.map((tech: ISkillDropdown) => (
                  <div
                    key={tech.id}
                    className="flex items-center px-3 py-1.5 rounded-lg border transition-all duration-300 group/techitem"
                    style={{
                      background: COLORS.accentGradient2,
                      borderImage: `${COLORS.borderGradient} 1`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  >
                    {tech.logoUrl && (
                      <img
                        src={tech.logoUrl}
                        alt={tech.logoName}
                        className="w-6 h-6 mr-2.5 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <span
                      className="text-sm font-medium"
                      style={{ color: COLORS.offWhite }}
                    >
                      {tech.logoName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
