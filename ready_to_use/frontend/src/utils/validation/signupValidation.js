export const validateSignupPhase1 = (formData) => {
    const errors = {};
    if (!formData.fullName) {
        errors.fullName = 'Full Name is required';
    }
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        errors.email = 'Email is invalid';
    }
    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
};

export const validateSignupPhase2 = (formData) => {
    const errors = {};
    if (!formData.dob) {
        errors.dob = 'Date of Birth is required';
    }
    if (!formData.phone) {
        errors.phone = 'Phone number is required';
    }
    return errors;
};

export const validateSignupPhase3 = (formData) => {
    const errors = {};
    if (!formData.bio) {
        errors.bio = 'Bio is required';
    }
    return errors;
};