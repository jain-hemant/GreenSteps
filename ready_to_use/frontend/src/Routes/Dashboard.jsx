import { useState } from 'react';
import OnlineUsers from '../Components/layout/OnlineUsers';
import { Calendar } from 'lucide-react';

function Dashboard() {
    // Sample course data
    const [courses] = useState([
        {
            id: 1,
            title: 'Operating System',
            description: 'Learn the basic operating system abstractions, mechanisms, and their implementations.',
            creator: 'Mark Lee',
            image: '/os-course.svg'
        },
        {
            id: 2,
            title: 'Artificial Intelligence',
            description: 'Intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals.',
            creator: 'Jung Jaehyun',
            image: '/ai-course.svg'
        },
        {
            id: 3,
            title: 'Software Engineering',
            description: 'Learn detailed of engineering to the design, development and maintenance of software.',
            creator: 'Kim Taeyeong',
            image: '/se-course.svg'
        }
    ]);

    // Current month calendar
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();

    // Generate calendar days
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push({ day: '', empty: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === currentDate.getDate();
        const isSelected = i === 9; // Example: 9th is selected
        calendarDays.push({ day: i, empty: false, isToday, isSelected });
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
                <p className="text-gray-600">Filter and browse your enrolled courses</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main content */}
                <div className="lg:w-2/3">
                    {/* Filter options */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md flex items-center gap-2">
                            Time <span className="text-xs">▼</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md flex items-center gap-2">
                            Level <span className="text-xs">▼</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md flex items-center gap-2">
                            Language <span className="text-xs">▼</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md flex items-center gap-2">
                            Type <span className="text-xs">▼</span>
                        </button>
                    </div>

                    {/* Course cards */}
                    <div className="space-y-6">
                        {courses.map(course => (
                            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-[1.01]">
                                <div className="p-6 flex flex-col md:flex-row gap-4">
                                    <div className="flex-shrink-0 bg-indigo-50 rounded-lg p-4 flex items-center justify-center">
                                        <img
                                            src={course.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=random&color=fff&size=128`}
                                            alt={course.title}
                                            className="w-16 h-16 object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                                        <p className="text-gray-600 mt-1">{course.description}</p>
                                        <div className="mt-3 flex justify-between items-center">
                                            <p className="text-sm text-gray-500">Created by: {course.creator}</p>
                                            <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 mt-6 lg:mt-0">
                    {/* Calendar */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">{currentMonth} {currentYear}</h2>
                            <div className="flex gap-2">
                                <button className="p-1 rounded-full hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button className="p-1 rounded-full hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="text-xs font-medium text-gray-500 py-2">{day}</div>
                            ))}

                            {calendarDays.map((day, index) => (
                                <div
                                    key={index}
                                    className={`text-sm p-2 rounded-full ${day.empty ? '' : 'cursor-pointer hover:bg-indigo-50'} ${day.isSelected ? 'bg-indigo-500 text-white' :
                                        day.isToday ? 'bg-indigo-100 text-indigo-700 font-medium' : ''
                                        }`}
                                >
                                    {day.day}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Online Users */}
                    <OnlineUsers />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;