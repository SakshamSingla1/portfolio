export interface IUser {
    id: number;
    email: string;
    token: string;
    role?: string;
    fullName: string;
    title?: string;
    aboutMe?: string;
    phone?: string;
    location?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    websiteUrl?: string;
    profileImageUrl?: string;
}

export interface IOption {
    value: string | number;
    label: string | number | React.ReactNode;
}