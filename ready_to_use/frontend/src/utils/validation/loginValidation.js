export const validateLogin = (formData) => {
    const errors = {};
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        errors.email = 'Email is invalid';
    }
    if (!formData.password) {
        errors.password = 'Password is required';
    }
    return errors;
};