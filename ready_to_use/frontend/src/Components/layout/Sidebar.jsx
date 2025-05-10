import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectMe } from '../../store/slices/userSlice.js';
import { selectSidebarCollapsed, selectMobileMenuOpen, toggleSidebar, toggleMobileMenu, setSidebarState, setMobileMenuState } from '../../store/slices/sidebarSlice.js';
import { logoutUser } from '../../utility/auth.js';
import './Sidebar.css';
import {
    LayoutDashboard,
    BookOpen,
    MessageSquare,
    Users,
    Calendar,
    Settings,
    FileText,
    Menu,
    X,
    LogOut
} from 'lucide-react';

function Sidebar() {
    const dispatch = useDispatch();
    const isCollapsed = useSelector(selectSidebarCollapsed);
    const mobileMenuOpen = useSelector(selectMobileMenuOpen);
    const location = useLocation();
    const currentUser = useSelector(selectMe);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            if (isMobileView) {
                // dispatch(setSidebarState(true)); // Prevent auto-collapse of desktop sidebar state on mobile view detection
            } else {
                dispatch(setMobileMenuState(false));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const handleToggleSidebar = () => {
        if (isMobile) {
            dispatch(toggleMobileMenu());
        } else {
            dispatch(toggleSidebar());
        }
    };

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'My Courses', icon: <BookOpen size={20} />, path: '/courses' },
        { name: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
        { name: 'Friends', icon: <Users size={20} />, path: '/friends' },
        { name: 'Schedule', icon: <Calendar size={20} />, path: '/schedule' },
        { name: 'Directory', icon: <FileText size={20} />, path: '/directory' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Mobile menu toggle button
    const MobileMenuButton = () => (
        <button
            onClick={handleToggleSidebar}
            className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
        >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    );

    // Sidebar content
    const SidebarContent = () => (
        <div className={`h-full flex flex-col ${isCollapsed && !mobileMenuOpen ? 'items-center' : 'items-start'}`}>
            {/* Logo */}
            <div className={`p-4 ${isCollapsed && !mobileMenuOpen ? 'justify-center w-full' : ''}`}>
                <Link to="/" className="flex items-center">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg p-2 shadow-lg">
                        <span className={isCollapsed && !mobileMenuOpen ? 'text-xl' : 'text-xl'}>MC</span>
                        {!isCollapsed && <span className="ml-1">Mantna Corp</span>}
                        {!isCollapsed && currentUser && <span className="ml-1">{currentUser.fullName}</span>}
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 w-full mt-6">
                <ul className="space-y-2 px-2">
                    {navItems.map((item) => (

                        <li key={item.name}>

                            <Link
                                to={item.path}
                                className={`flex items-center p-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                    ? 'bg-indigo-100 text-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-indigo-50'
                                    } ${isCollapsed && !mobileMenuOpen ? 'justify-center' : ''}`}
                            >
                                <div className={isActive(item.path) ? 'text-indigo-600' : 'text-gray-500'}>
                                    {item.icon}
                                </div>
                                {(!isCollapsed || mobileMenuOpen) && (
                                    <span className="ml-3">{item.name}</span>
                                )}
                                {isActive(item.path) && !isCollapsed && (
                                    <div className="absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-lg"></div>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Profile */}
            {currentUser && (
                <div className="mt-auto w-full">
                    <Link to="/profile" className={`p-4 border-t border-gray-200 w-full ${isCollapsed && !mobileMenuOpen ? 'flex justify-center' : ''} hover:bg-indigo-50 transition-colors`}>
                        <div className={`flex items-center ${isCollapsed && !mobileMenuOpen ? 'justify-center' : ''}`}>
                            <div className="relative">
                                <img
                                    src={currentUser.profile.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.fullName || 'User')}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
                                />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            {(!isCollapsed || mobileMenuOpen) && (
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700">{currentUser.name || 'User'}</p>
                                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                                </div>
                            )}
                        </div>
                    </Link>
                    <button
                        onClick={() => logoutUser()}
                        className={`w-full p-4 flex items-center text-red-600 hover:bg-red-50 transition-colors ${isCollapsed && !mobileMenuOpen ? 'justify-center' : ''}`}
                    >
                        <LogOut size={20} />
                        {(!isCollapsed || mobileMenuOpen) && (
                            <span className="ml-3">Logout</span>
                        )}
                    </button>
                </div>
            )}

            {/* Collapse Toggle Button (Desktop only) */}
            {!isMobile && (
                <button
                    onClick={handleToggleSidebar}
                    className="p-2 m-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-200 self-end"
                >
                    {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="13 17 18 12 13 7"></polyline>
                            <polyline points="6 17 11 12 6 7"></polyline>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="11 17 6 12 11 7"></polyline>
                            <polyline points="18 17 13 12 18 7"></polyline>
                        </svg>
                    )}
                </button>
            )}
        </div>
    );

    return (
        <>
            <MobileMenuButton />

            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:block h-screen bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} fixed top-0 left-0 z-40`}
            >
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            {isMobile && (
                <div
                    className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-30 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => dispatch(setMobileMenuState(false))}
                >
                    <aside
                        className={`fixed top-0 left-0 h-screen bg-white shadow-xl transition-all duration-300 w-64 z-40 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SidebarContent />
                    </aside>
                </div>
            )}

        </>
    );
};

export default Sidebar;