import { getAdminData } from './apiClient';

export const validateAdmin = async (token) => {
  try {
    await getAdminData('/settings', token);
    return true;
  } catch (e) {
    return false;
  }
};
