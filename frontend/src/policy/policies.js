import { USER_ROLES } from '##/shared/directory.js';

export default {
  [USER_ROLES.guest]: {
    static: ['sign-in:visit', 'sign-up:visit'],
  },
  [USER_ROLES.admin]: {
    static: ['admin-dashboard-visit'],
  },
  [USER_ROLES.user]: {
    static: ['user-dashboard-visit'],
  },
};
