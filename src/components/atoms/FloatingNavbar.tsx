import { motion } from "framer-motion";
import { createUseStyles } from "react-jss";
import { COLORS } from "../../utils/constant";

interface NavItem {
  id: string;
  name: string;
  link: string;
  icon?: React.ReactNode;
  active?: boolean;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
  onNavItemClick?: (id: string) => void;
}

const useStyles = createUseStyles({
  navWrapper: {
    position: "fixed",
    zIndex: 5000,
    left: 0,
    right: 0,
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    width: "100%",

    top: "1rem",
    "@media (min-width: 768px)": {
      top: "1.5rem",
      bottom: "auto",
    },
    "@media (max-width: 767px)": {
      top: "auto",
      bottom: "0.5rem",
    },
  },

  navContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "rgba(17, 25, 40, 0.85)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: `1px solid ${COLORS.grayTransparent}`,
    padding: "0.5rem 1rem",
    width: "90%",
    maxWidth: "600px",
  },

  navLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.75rem",
    textDecoration: "none",
    padding: "0.5rem",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    color: COLORS.light,

    "&:hover": {
      color: COLORS.highlight, // gold highlight on hover
      background: "rgba(255,255,255,0.08)",
    },

    "@media (max-width: 767px)": {
      gap: 0,
      fontSize: 0, // hide text label
    },
  },

  navLabel: {
    "@media (max-width: 767px)": {
      display: "none",
    },
  },

  activeLink: {
    fontWeight: 600,
    backgroundImage: COLORS.textGradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",

    "&:hover": {
      backgroundImage: COLORS.textGradient, // keep gradient on hover
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },

  activeIcon: {
    backgroundImage: COLORS.textGradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  inactiveIcon: {
    color: COLORS.light,
    transition: "color 0.3s ease",
    "&:hover": {
      color: COLORS.highlight,
    },
  },
});

export const FloatingNav = ({ navItems, className = "", onNavItemClick }: FloatingNavProps) => {
  const classes = useStyles();

  const handleClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    if (onNavItemClick) {
      onNavItemClick(item.id || item.link);
    }
  };

  return (
    <div className={`${classes.navWrapper} ${className}`}>
      <motion.div
        className={classes.navContainer}
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {navItems.map((navItem) => (
          <motion.div
            key={`link-${navItem.id || navItem.name}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={navItem.active ? 'bg-blue-500/20 rounded-lg' : ''}
          >
            <button
              onClick={(e) => handleClick(e, navItem)}
              className={`${classes.navLink} ${
                navItem.active ? classes.activeLink : ""
              }`}
            >
              {navItem.icon && (
                <span
                  className={navItem.active ? classes.activeIcon : classes.inactiveIcon}
                  style={{ fontSize: "1.25rem" }}
                >
                  {navItem.icon}
                </span>
              )}
              <span className={classes.navLabel}>{navItem.name}</span>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
