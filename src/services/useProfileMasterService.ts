import { API_METHOD } from "../utils/constant";
import { request } from ".";

export interface IProfile {
    id?: string;
    fullName: string;
    email: string;
    title?: string;
    aboutMe?: string;
    phone?: string;
    location?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    websiteUrl?: string;
    profileImageUrl?: string;
    resumeUrl?: string;
}

export interface IEducation {
    id?: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    description: string;
    location: string;
    gradeType?: string;
    grade?: string;
}

export interface IExperience {
    id?: number;
    companyName: string;
    jobTitle: string;
    location: string;
    startDate: string;
    endDate?: string | null;
    currentlyWorking: boolean;
    description: string;
    technologiesUsed: ISkillDropdown[]; // objects in response
}

export interface ISkill {
    id?: number;
    logoId?: number | null;
    logoName?: string | null;
    logoUrl?: string | null;
    category?: string | null;
    level: string;
}

export interface ISkillDropdown {
    id?: number;
    logoName: string;
    logoUrl: string;
    category?: string | null;
}

export interface IProject {
    id?: number;
    projectName: string;
    projectDescription: string;
    projectLink: string;
    technologiesUsed: ISkillDropdown[];
    projectStartDate: string;
    projectEndDate: string;
    currentlyWorking: boolean;
    projectImageUrl: string;
}

export interface IProfileMaster {
    profile: IProfile;
    educations: IEducation[];
    experiences: IExperience[];
    skills: ISkill[];
    projects: IProject[];
}

export const PROFILE_MASTER_URLS = {
    GET: "/profile-master",
};

export const useProfileMasterService = () => {

    const getProfileMaster = async () => {
        const url = PROFILE_MASTER_URLS.GET;
        return request(API_METHOD.GET, url, null, null);
    };

    return {
        getProfileMaster,
    };
};

export default useProfileMasterService;
