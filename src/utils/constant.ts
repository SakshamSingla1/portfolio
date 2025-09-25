import type { IOption } from "./types";

export const API_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

export const COLORS = {
    // gradients
    primaryGradient: 'linear-gradient(to bottom right, #76D1FF, #FFBC5E)',
    secondaryGradient: 'linear-gradient(to bottom right, #0a1d2c, #000000), #0a1d2c',
    accentGradient1: 'linear-gradient(to bottom right, #76D1FF, #FFBC5E)',
    accentGradient2: 'linear-gradient(135deg, #4a90a400, #ffffff00), #0a1d2c',
    borderGradient: 'linear-gradient(to bottom right, #76D1FF, #FFBC5E)',
    textGradient: 'linear-gradient(to right, #76D1FF, #FFBC5E)',
    primary: 'hsl(0, 0%, 22%)',
    secondary: 'hsl(240, 1%, 17%)',
    darkShade1: 'hsl(240, 2%, 13%)',
    darkShade2: 'hsl(240, 2%, 12%)',
    darkest: 'hsl(0, 0%, 7%)',
    light: 'hsl(0, 0%, 100%)',
    offWhite: 'hsl(0, 0%, 98%)',
    highlight: 'hsl(45, 100%, 72%)',
    highlightLight: 'hsl(55, 100%, 82%)',
    gold: 'hsl(45, 54%, 58%)',
    gray: 'hsl(0, 0%, 84%)',
    grayTransparent: 'hsla(0, 0%, 84%, 0.7)',
    error: 'hsl(0, 43%, 51%)',
};

export const SKILL_CATEGORY_OPTIONS: IOption[] = [
    { value: 'FRONTEND', label: 'Frontend' },
    { value: 'BACKEND', label: 'Backend' },
    { value: 'PROGRAMMING', label: 'Programming' },
    { value: 'TOOL', label: 'Tool' },
    { value: 'DATABASE', label: 'Database' },
    { value: 'DEVOPS', label: 'DevOps' },
    { value: 'TESTING', label: 'Testing' },
    { value: 'MOBILE', label: 'Mobile' },
    { value: 'CLOUD', label: 'Cloud' },
    { value: 'SECURITY', label: 'Security' },
    { value: 'DATA_SCIENCE', label: 'Data Science' },
    { value: 'UI_UX', label: 'UI/UX' },
    { value: 'SOFT_SKILLS', label: 'Soft Skills' },
    { value: 'OTHER', label: 'Other' }
];

export const DEGREE_OPTIONS: IOption[] = [
    { value: 'HIGH_SCHOOL', label: '10th' },
    { value: 'SENIOR_SECONDARY', label: '12th' },
    { value: 'BACHELORS', label: 'Bachelors' },
    { value: 'MASTERS', label: 'Masters' },
    { value: 'DIPLOMA', label: 'Diploma' },
    { value: 'PHD', label: 'PhD' },
    { value: 'OTHER', label: 'Other' },
];

