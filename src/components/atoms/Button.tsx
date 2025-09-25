import React, { useMemo } from "react";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { COLORS } from "../../utils/constant";

type CustomVariant = "primaryContained" | "secondaryContained" | "tertiaryContained" | 
                    "primaryText" | "secondaryText" | "tertiaryText" | "viewBtn";
type CustomSize = "small" | "medium" | "large";

interface StyleProps {
    iconPosition?: string;
    hasLabel?: boolean;
}

const getButtonStyles = (variant: CustomVariant, props: StyleProps) => {
    const baseStyles = {
        minWidth: "auto",
        padding: 0,
        lineHeight: "1 !important",
        textTransform: "none" as const,
        position: 'relative' as const,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-disabled': {
            opacity: 0.6,
        }
    };

    const variantStyles = {
        primaryContained: {
            color: COLORS.light,
            backgroundColor: COLORS.primaryGradient,
            border: 'none',
            '&:hover': {
                opacity: 0.9,
                boxShadow: `0 4px 12px ${COLORS.primary}33`,
            },
            '&:active': {
                transform: 'translateY(1px)',
            },
            '&.Mui-disabled': {
                background: COLORS.gray,
                color: COLORS.light,
            }
        },
        secondaryContained: {
            color: COLORS.primary,
            backgroundColor: COLORS.light,
            border: `1px solid ${COLORS.primary}`,
            '&:hover': {
                backgroundColor: `${COLORS.primary}0F`,
            },
            '&.Mui-disabled': {
                borderColor: COLORS.gray,
                color: COLORS.gray,
            }
        },
        tertiaryContained: {
            color: COLORS.primary,
            backgroundColor: 'transparent',
            border: `1px solid ${COLORS.gray}`,
            '&:hover': {
                backgroundColor: `${COLORS.primary}0A`,
                borderColor: COLORS.primary,
            }
        },
        primaryText: {
            color: COLORS.primary,
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            '&:hover': {
                backgroundColor: `${COLORS.primary}0F`,
                textDecoration: 'none',
            }
        },
        secondaryText: {
            color: COLORS.darkest,
            backgroundColor: 'transparent',
            '&:hover': {
                color: COLORS.primary,
                backgroundColor: `${COLORS.primary}0A`,
            }
        },
        tertiaryText: {
            color: COLORS.gray,
            backgroundColor: 'transparent',
            '&:hover': {
                color: COLORS.primary,
                backgroundColor: `${COLORS.primary}0A`,
            }
        },
        viewBtn: {
            color: COLORS.primary,
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            padding: '12px 12px 12px 24px !important',
            '&:hover': {
                textDecoration: 'none',
                backgroundColor: 'transparent',
            }
        }
    };

    const sizeStyles = {
        small: {
            fontSize: '0.75rem',
            padding: props.hasLabel ? '6px 12px' : '6px',
            minHeight: '32px',
        },
        medium: {
            fontSize: '0.875rem',
            padding: props.hasLabel ? '8px 16px' : '8px',
            minHeight: '40px',
        },
        large: {
            fontSize: '1rem',
            padding: props.hasLabel ? '12px 24px' : '12px',
            minHeight: '48px',
        }
    };

    // Determine the size to use
    const size: 'small' | 'medium' | 'large' = variant === 'viewBtn' ? 'medium' : 'medium'; // Default to 'medium' if size is not provided
    
    return {
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...(props.iconPosition && {
            paddingLeft: props.hasLabel ? '40px' : '20px',
            '&:hover': {
                paddingLeft: props.hasLabel ? '48px' : '24px',
            }
        })
    };
};

interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
    variant: CustomVariant;
    label?: string | null;
    isLoading?: boolean;
    iconButton?: string;
    size?: CustomSize;
    iconPosition?: string;
    startIcon?: React.ReactNode;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant,
    label,
    iconPosition,
    isLoading,
    iconButton,
    size = "large",
    className = '',
    disabled,
    startIcon,
    children,
    ...props
}) => {
    const buttonStyles = useMemo(() => 
        getButtonStyles(variant, { 
            iconPosition, 
            hasLabel: Boolean(label || children) 
        }), 
        [variant, iconPosition, label, children]
    );

    const buttonContent = useMemo(() => {
        if (isLoading) {
            return <CircularProgress size={20} color="inherit" />;
        }

        if (iconButton) {
            return <img 
                src={iconButton} 
                alt="" 
                style={{ 
                    width: size === 'small' ? '16px' : size === 'medium' ? '20px' : '22px',
                    height: size === 'small' ? '16px' : size === 'medium' ? '20px' : '22px'
                }} 
            />;
        }

        return (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {startIcon && <span style={{ display: 'flex' }}>{startIcon}</span>}
                {label}
                {children}
            </span>
        );
    }, [isLoading, iconButton, size, label, children, startIcon]);

    return (
        <MuiButton
            variant="contained"
            disabled={disabled || isLoading}
            sx={buttonStyles}
            className={className}
            {...props}
        >
            {buttonContent}
        </MuiButton>
    );
};

export default Button;