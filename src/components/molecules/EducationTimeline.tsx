import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { type IEducation } from '../../services/useProfileMasterService';
import EducationCard from '../atoms/EducationCard';

interface EducationTimelineProps {
  educations: IEducation[];
  className?: string;
}

const EducationTimeline: React.FC<EducationTimelineProps> = ({ 
  educations, 
  className = '' 
}) => {
  if (!educations || educations.length === 0) {
    return null;
  }

  const sortedEducationByEndYear = [...educations].sort((a, b) => {
    const endYearA = a.endYear ? parseInt(a.endYear) : 0;
    const endYearB = b.endYear ? parseInt(b.endYear) : 0;
    return endYearB - endYearA;
  });

  return (
    <div className={`relative ${className}`}>
      {/* Vertical line - centered on mobile, 1/4 on desktop */}
      <div className="absolute left-1/2 md:left-1/4 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
      
      <div className="relative space-y-12">
        {sortedEducationByEndYear.map((education, index) => {
          const isLeft = index % 2 === 0;
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, amount: 0.3 });
          
          return (
            <motion.div
              ref={ref}
              key={education.id || index}
              className={`flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : (isLeft ? -50 : 50),
                y: isInView ? 0 : 20
              }}
              transition={{ duration: 0.6, ease: [0.16, 0.77, 0.47, 0.97], delay: index * 0.1 }}
            >
              {/* Card - full width on mobile, 5/12 on desktop */}
              <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'} mb-6 md:mb-0`}>
                <EducationCard education={education} className="w-full" />
              </div>
              
              {/* Timeline Dot - centered on mobile, 1/4 on desktop */}
              <div className="w-12 md:w-2/12 flex justify-center mb-6 md:mb-0">
                <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center z-10 relative">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className={`absolute ${isLeft ? 'md:ml-24 ml-28' : 'md:mr-24 mr-28'} whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-gray-700`}>
                    {education.endYear || 'Present'}
                  </div>
                </div>
              </div>
              
              {/* Spacer (desktop only) */}
              <div className={`hidden md:block w-5/12 ${isLeft ? 'pl-8' : 'pr-8'}`}></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationTimeline;