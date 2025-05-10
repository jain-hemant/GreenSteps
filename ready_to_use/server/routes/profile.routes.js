import * as profileController from '##/server/controllers/profile.controller.js';
import * as addressController from '##/server/controllers/address.controller.js';
import { isAllowed } from '##/server/policies/api.policies.js';
import { withAsyncErrorHandling } from '##/server/utility/utility.js';

export default function routes(app) {
  // Profile routes
  app
    .route('/api/profile/me')
    .all(isAllowed)
    .get(withAsyncErrorHandling(profileController.loadMe));

  app
    .route('/api/profile')
    .all(isAllowed)
    .get(withAsyncErrorHandling(profileController.getProfile))
    .post(withAsyncErrorHandling(profileController.createProfile))
    .put(withAsyncErrorHandling(profileController.updateProfile))
    .delete(withAsyncErrorHandling(profileController.deleteProfile));

  // Allow address creation without authentication during registration
  app
    .route('/api/address/register')
    .post(withAsyncErrorHandling(addressController.createAddressForRegistration));

  app
    .route('/api/profile/:userId')
    .all(isAllowed)
    .get(withAsyncErrorHandling(profileController.getProfile));

  // Address routes
  app
    .route('/api/address')
    .all(isAllowed)
    .post(withAsyncErrorHandling(addressController.createAddress))
    .get(withAsyncErrorHandling(addressController.getAllAddresses));

  app
    .route('/api/address/:addressId')
    .all(isAllowed)
    .get(withAsyncErrorHandling(addressController.getAddress))
    .put(withAsyncErrorHandling(addressController.updateAddress))
    .delete(withAsyncErrorHandling(addressController.deleteAddress));
}
