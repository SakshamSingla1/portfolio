import { API_METHOD } from "../utils/constant";
import { request } from ".";

export const CONTACT_US_URLS = {
    CREATE: "/contact-us",
    GET_BY_PROFILE: "/contact-us/profile/:profileId",
};

export interface ContactUs {
    id?: string;
    name: string;
    email: string;
    message: string;
    phone: string;
    created: string;
}

export interface ContactUsRequest {
    name: string;
    email: string;
    message: string;
    phone: string;
    profileId: string;
}

export interface ContactUsFilterParams {
    search?: string;
    page?: number;
    size?: number;
}

export const useContactUsService = () => {
    // ---------------- CREATE ----------------
    const create = (contactUs: ContactUsRequest) =>
        request(API_METHOD.POST, CONTACT_US_URLS.CREATE, null, contactUs);

    return {
        create,
    };
};

export default useContactUsService;
