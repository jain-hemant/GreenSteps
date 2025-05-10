import { useSelector } from 'react-redux';
import { selectAuthenticated } from '##/src/store/slices/authSlice.js';
import { selectSidebarCollapsed } from '##/src/store/slices/sidebarSlice.js'; // Added import
import Sidebar from './Sidebar';

function MainLayout({ children }) {
    const isAuthenticated = useSelector(selectAuthenticated);
    const isSidebarCollapsed = useSelector(selectSidebarCollapsed); // Get sidebar state

    // Determine margin class based on authentication and sidebar state
    // const mainContentMarginClass = () => {
    //     if (!isAuthenticated) return ''; // No margin if not authenticated
    //     return isSidebarCollapsed ? 'md:ml-0' : 'md:ml-0'; // Dynamic margin for md and larger screens
    // };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {isAuthenticated && <Sidebar />}
            <main className={`flex-1 transition-all duration-300 `}>  { }
                {children}
            </main>
        </div>
    );
};

export default MainLayout;