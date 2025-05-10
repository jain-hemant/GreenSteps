import { useState } from 'react';
import { setComponentDisplayName } from '##/src/utility/utility.js';
import Api from '##/src/request.js';
import { Link, useNavigate } from 'react-router-dom';
import useAPIErrorHandler from '##/src/hooks/useAPIErrorHandling.js';
import { LucideUser } from 'lucide-react';

// Import signup step components
import BasicInfo from '##/src/pages/signup/BasicInfo.jsx';
import PersonalDetails from '##/src/pages/signup/PersonalDetails.jsx';
import ProfileSetup from '##/src/pages/signup/ProfileSetup.jsx';

function Signup() {
  const navigate = useNavigate();
  const handleError = useAPIErrorHandler('Signup');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    // User Details
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    phone: '',
    // Address Details
    country: '',
    state: '',
    city: '',
    zip: '',
    address: '',
    // Profile Details (Optional)
    bio: '',
    avatar: '',
    interestIn: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmitUserDetails = async () => {
    setLoading(true);
    try {
      // const userExists = await checkUserExists(formData.email);
      // if (userExists) {
      //   navigate('/login');
      //   return;
      // }
      setStep(2);
    } catch (error) {
      handleError('handleSubmitUserDetails', error, 'Failed to proceed with user details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAddressDetails = async () => {
    setLoading(true);
    try {
      setStep(3);
    } catch (error) {
      handleError('handleSubmitAddressDetails', error, 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfile = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    try {
      // Now register with all required information
      const user = await Api.fetch('/api/auth/register', {
        method: 'POST',
        body: {
          // User details
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          dob: formData.dob,
          phone: formData.phone,
          bio: formData.bio,
          avatar: formData.avatar,
          interestIn: formData.interestIn,
          // Address details
          address: {
            country: formData.country,
            state: formData.state,
            city: formData.city,
            zip: formData.zip,
            address: formData.address
          }
        }
      });
      setUserId(user.userId);
      navigate('/login');
    } catch (error) {
      handleError('handleSubmitProfile', error, 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
            <LucideUser className="h-10 w-10 text-white" />
          </div>
        </div>
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {step === 1 ? 'Create your account' : step === 2 ? 'Personal Details' : 'Complete your profile'}
          </h2>
        </div>

        {step === 1 && (
          <BasicInfo
            formData={formData}
            handleChange={handleChange}
            onNext={handleSubmitUserDetails}
            loading={loading}
          />
        )}

        {step === 2 && (
          <PersonalDetails
            formData={formData}
            handleChange={handleChange}
            onNext={handleSubmitAddressDetails}
            onBack={() => setStep(1)}
            loading={loading}
          />
        )}

        {step === 3 && (
          <ProfileSetup
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmitProfile}
            // onSkip={handleSkip}
            loading={loading}
          />
        )}
      </div>

    </div>
  );
}

setComponentDisplayName(Signup, 'Signup');
export default Signup;