import type { IUserProfile } from "../interfaces/UserProfile";

export const PROFILE_STORE_KEY = "user_profile";

export const getProfile = (): IUserProfile => {
  const profile: string = localStorage.getItem(PROFILE_STORE_KEY) || "";
  const parsedProfile: IUserProfile = JSON.parse(profile);

  return parsedProfile;
};

export const saveProfile = (profile: IUserProfile): void => {
  const sProfile: string = JSON.stringify(profile);
  localStorage.setItem(PROFILE_STORE_KEY, sProfile);
};
