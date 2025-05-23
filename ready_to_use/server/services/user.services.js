function sanitizeUser(user) {
  let safeUserObject = null;

  if (user) {
    safeUserObject = {
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
      profile: user.profile,
      address: user.address,
      phone: user.phone,
      dob: user.dob,
      // lastLoggedInDate: user.lastLoggedInDate,
      // createdAt: user.createdAt,
      // updatedAt: user.updatedAt,
    };
  }
  return safeUserObject;
}

export { sanitizeUser };
