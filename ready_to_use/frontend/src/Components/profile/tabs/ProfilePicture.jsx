import { useState } from 'react';
import { Camera } from 'lucide-react';
import { uploadImage } from '../../../utility/cloudinary.js';
import { deleteFile, uploadFile } from '##/src/utility/file.utility.js';
import { useDispatch } from 'react-redux';
import { updateProfile } from '##/src/store/slices/profileSlice.js';
import useAPIErrorHandler from '##/src/hooks/useAPIErrorHandling.js';
import { setMe } from '##/src/store/slices/userSlice.js';

function ProfilePicture({ currentImage, onUpdate }) {
    const [previewImage, setPreviewImage] = useState(currentImage);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();
    const handleError = useAPIErrorHandler('ProfilePicture');
    console.log(currentImage, 'currentImage');

    const handleImageChange = async (file) => {
        if (!file) return;
        console.log(file);
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        try {
            const { signedUrl } = await uploadFile(file, handleError);
            if (currentImage) {
                await deleteFile(currentImage, handleError);
            }
            const { user } = await dispatch(updateProfile({ avatar: signedUrl.split('?')[0] })).unwrap();
            dispatch(setMe(user));

        } catch (error) {
            console.log(error);

        }
        // 
        // Validate file size

    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleImageChange(file);
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 rounded-lg">
            <div
                className={`relative w-full max-w-md aspect-square rounded-lg border-2 border-dashed
                    ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
                    transition-all duration-200 flex flex-col items-center justify-center p-6`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <img
                    src={currentImage || 'https://ui-avatars.com/api/?size=200'}
                    alt="Profile"
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <div className="mt-6 text-center">
                    <label className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
                        <Camera size={20} />
                        <span>Choose Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                console.log(e.target.files[0]);

                                handleImageChange(e.target.files[0])
                            }}
                            className="hidden"
                            disabled={isUploading}
                        />
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                        or drag and drop your image here
                    </p>
                </div>
            </div>

            {isUploading && (
                <div className="text-sm text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                    Uploading image...
                </div>
            )}

            {error && (
                <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-full">
                    {error}
                </div>
            )}

            <div className="text-sm text-gray-500">
                <p>Supported formats: JPG, PNG, GIF</p>
                <p>Maximum file size: 5MB</p>
            </div>
        </div>
    );
}

export default ProfilePicture;