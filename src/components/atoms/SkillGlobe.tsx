import React, { useMemo, useState, useEffect } from "react";
import { Cloud } from "react-icon-cloud";

export interface SkillGlobeProps {
  logoUrls: string[];
}

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%", // full width
      minHeight: 250, // fixed minHeight
      maxWidth: 500,
      margin: "0 auto",
      paddingTop: 40,
      paddingBottom: 40,
      position: "relative" as const,
      overflow: "hidden",
    },
  },
  options: {
    reverse: false,
    depth: 1,
    wheelZoom: false,
    imageScale: 1.2, // reduce scale
    activeCursor: "pointer",
    tooltip: "native" as const,
    initial: [0.1, -0.1],
    clickToFront: 600,
    tooltipDelay: 0,
    outlineColour: "transparent",
    maxSpeed: 0.02,
    minSpeed: 0.04,
    freezeActive: true,
    freezeDecel: true,
    shuffleTags: true,
  },
};

const SkillGlobe: React.FC<SkillGlobeProps> = ({ logoUrls = [] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const renderedLogos = useMemo(() => {
    const validUrls = logoUrls.filter(Boolean); // remove empty strings
    return validUrls.map((url, index) => (
      <a key={index} href="#" onClick={(e) => e.preventDefault()}>
        <img
          height={42}
          width={42}
          alt="Skill logo"
          src={url}
          style={{ objectFit: "contain", borderRadius: 8 }}
          loading="lazy"
        />
      </a>
    ));
  }, [logoUrls]);

  if (!isMounted || !renderedLogos.length) return null;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Cloud {...cloudProps}>{renderedLogos}</Cloud>
    </div>
  );
};

export default SkillGlobe;
