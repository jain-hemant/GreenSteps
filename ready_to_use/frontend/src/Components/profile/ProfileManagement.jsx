import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { User, Lock, MapPin, Camera, AlertTriangle } from 'lucide-react';

import { selectMe, updateUserProfile, deleteAccount, setMe } from '../../store/slices/userSlice.js';
import { logoutUser } from '../../utility/auth.js';
import Api from '##/src/request.js';
import PersonalInfo from './tabs/PersonalInfo';
import PasswordManagement from './tabs/PasswordManagement';
import AddressInfo from './tabs/AddressInfo';
import ProfilePicture from './tabs/ProfilePicture';
import DangerZone from './tabs/DangerZone';
import { fetchMe } from '../../store/slices/userSlice';
import { updateProfile } from '##/src/store/slices/profileSlice.js';

function ProfileManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectMe);
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        bio: '',
        phone: '',
        avatar: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        }
    });

    useEffect(() => {
        // console.log('pmgmt Current User:', currentUser);
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                fullName: currentUser.name || '',
                email: currentUser.email || '',
                bio: currentUser.profile.bio || '',
                phone: currentUser.phone || '',
                avatar: currentUser.profile.avatar || '',
                address: currentUser.address[0] || {
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    zip: ''
                }
            }));
        }
    }, [currentUser]);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const userData = await Api.fetch('/api/profile/me', {
    //                 method: 'GET'
    //             });
    //             const userProfile = await Api.fetch('/api/profile', {
    //                 method: 'GET'
    //             });
    //             console.log('User Data:', userData);
    //             console.log('User Profile:', userProfile.profile);
    //             setFormData(prev => ({
    //                 ...prev,
    //                 fullName: currentUser?.name || '',
    //                 email: currentUser?.email || '',
    //                 bio: currentUser.profile.bio || '',
    //                 phone: currentUser?.profile?.phone || '',
    //                 avatar: currentUser.profile?.avatar || '',
    //                 address: currentUser.address[0]
    //             }));
    //             // dispatch(fetchMe({ ...userData, profile: userProfile }));
    //             // dispatch(setMe(currentUser));
    //         } catch (error) {
    //             console.error('Failed to fetch user data:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, [dispatch]);

    const handleFieldUpdate = (name, value) => {
        let address = null

        if (name === 'city' || name === 'state' || name === 'country' || name === 'zip') {
            address = {
                ...formData.address,
                [name]: value
            }
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
            return
        }

        setFormData(prev => {
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                return {
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value
                    }
                };
            }
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user data
            // const userData = await Api.fetch('/api/user/update/', {
            //     method: 'PUT',
            //     body: {
            //         name: formData.fullName,
            //         email: formData.email,
            //         phone: formData.phone,
            //         // bio: formData.bio
            //     }
            // });

            // If address is updated
            // if (formData.address && formData.address._id) {
            //     await Api.fetch(`/api/address/${formData.address._id}`, {
            //         method: 'PUT',
            //         body: {
            //             country: formData.address.country,
            //             state: formData.address.state,
            //             city: formData.address.city,
            //             zip: formData.address.zip
            //         }
            //     });
            // }

            // await dispatch(updateUserProfile(userData)).unwrap();
            const { user } = await dispatch(updateProfile(formData)).unwrap();
            dispatch(setMe(user));
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await dispatch(deleteAccount()).unwrap();
            await logoutUser();
            navigate('/login');
        } catch (error) {
            console.error('Failed to delete account:', error);
        }
    };

    useEffect(() => {
        console.log('Form Data:', formData);
    }, [formData])
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Profile Management</h1>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="flex space-x-2 border-b border-gray-200">
                        <TabsTrigger
                            value="personal"
                            className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'personal' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <User size={16} className="mr-2" />
                            Personal Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="picture"
                            className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'picture' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Camera size={16} className="mr-2" />
                            Profile Picture
                        </TabsTrigger>
                        <TabsTrigger
                            value="password"
                            className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'password' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Lock size={16} className="mr-2" />
                            Password
                        </TabsTrigger>
                        <TabsTrigger
                            value="address"
                            className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'address' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <MapPin size={16} className="mr-2" />
                            Address
                        </TabsTrigger>
                        <TabsTrigger
                            value="danger"
                            className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'danger' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <AlertTriangle size={16} className="mr-2" />
                            Danger Zone
                        </TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit}>
                        <TabsContent value="personal">
                            <PersonalInfo
                                onUpdate={handleFieldUpdate}
                                isEditing={isEditing}
                                currentUser={formData}
                            />
                        </TabsContent>

                        <TabsContent value="picture">
                            <ProfilePicture
                                currentImage={formData.avatar}
                                onUpdate={handleFieldUpdate}
                            />
                        </TabsContent>

                        <TabsContent value="password">
                            <PasswordManagement onUpdate={handleFieldUpdate} />
                        </TabsContent>

                        <TabsContent value="address">
                            <AddressInfo
                                onUpdate={handleFieldUpdate}
                                isEditing={isEditing}
                                address={formData.address}
                            />
                        </TabsContent>

                        <TabsContent value="danger">
                            <DangerZone onDeleteAccount={handleDeleteAccount} />
                        </TabsContent>

                        {activeTab !== 'danger' && (
                            <div className="flex justify-end space-x-4 mt-6">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        )}
                    </form>
                </Tabs>
            </div>
        </div>

    );
}

export default ProfileManagement;
