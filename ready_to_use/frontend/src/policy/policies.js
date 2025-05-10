import { USER_ROLES } from '##/shared/directory.js';

export default {
  [USER_ROLES.guest]: {
    static: ['sign-in:visit', 'sign-up:visit'],
  },
  [USER_ROLES.user]: {
    static: [
      'user-dashboard-visit',
      'user-profile-visit',
      'dashboard-visit',
      'courses-visit',
      'messages-visit',
      'friends-visit',
      'schedule-visit',
      'directory-visit',
      'settings-visit'
    ],
  },
  [USER_ROLES.admin]: {
    static: ['admin-dashboard-visit'],
  },
  [USER_ROLES.viewer]: {
    static: ['viewer-dashboard-visit'],
  },
  [USER_ROLES.creator]: {
    static: ['creator-dashboard-visit'],
  },
};
