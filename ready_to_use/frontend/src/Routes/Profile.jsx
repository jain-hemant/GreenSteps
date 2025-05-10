import FileComponent from '../Components/common/FileComponent';
import ProfileManagement from '../Components/profile/ProfileManagement';

function Profile() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <FileComponent />
            <ProfileManagement />
        </div>
    );
}

export default Profile;