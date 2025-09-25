import {
    default as MuiTextField,
    type TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { styled } from "@mui/system";
import { COLORS } from "../../utils/constant"

const StyledTextField = styled(MuiTextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: COLORS.light,
        '& fieldset': {
            borderColor: COLORS.gray,
            borderWidth: '1px',
        },
        '&:hover fieldset': {
            borderColor: COLORS.highlight,
        },
        '&.Mui-focused fieldset': {
            borderColor: COLORS.highlight,
            boxShadow: `0 0 0 2px ${COLORS.highlight}33`,
        },
        '&.Mui-error': {
            '& fieldset': {
                borderColor: COLORS.error,
            },
            '&:hover fieldset': {
                borderColor: COLORS.error,
            },
        },
        '&.Mui-disabled': {
            backgroundColor: COLORS.offWhite,
            '& fieldset': {
                borderColor: `${COLORS.gray}80`,
            },
        },
    },
    '& .MuiInputLabel-root': {
        color: COLORS.primary,
        '&.Mui-focused': {
            color: COLORS.highlight,
        },
        '&.Mui-error': {
            color: COLORS.error,
        },
    },
    '& .MuiFormHelperText-root': {
        marginLeft: 0,
        marginTop: '4px',
        '&.Mui-error': {
            color: COLORS.error,
        },
    },
    '& .MuiInputBase-input': {
        padding: '12px 16px',
        color: COLORS.primary,
        '&::placeholder': {
            color: COLORS.gray,
            opacity: 1,
        },
    },
    '& .MuiOutlinedInput-input': {
        '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${COLORS.light} inset`,
            WebkitTextFillColor: COLORS.primary,
            borderRadius: '8px',
        },
    },
});

const TextField: React.FC<MuiTextFieldProps> = (props) => {
    return (
        <div className={`flex flex-col gap-1 w-full ${props.disabled ? 'opacity-70' : ''}`}>
            <StyledTextField
                {...props}
                variant="outlined"
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        ...(props.multiline && {
                            padding: 0,
                            '& textarea': {
                                padding: '12px 16px',
                            },
                        }),
                        ...(props.size === 'small' && {
                            '& .MuiInputBase-input': {
                                padding: '8px 12px',
                                fontSize: '0.875rem',
                            },
                        }),
                    },
                    ...props.sx,
                }}
            />
        </div>
    );
};

export default TextField;