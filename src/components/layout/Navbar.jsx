/*
    Dashboard
    Projects
    Tasks
    Team
    Settings
*/
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

import { getProfileById } from '../../api/profiles';
import { DEV_USER_ID } from '../../utils/auth';
import { useEffect, useState } from 'react';

import { Settings } from 'lucide-react';

export default function Navbar() {
    const [authUserData, setAuthUserData] = useState(null);

    useEffect(() => {
        getProfileById(DEV_USER_ID).then(setAuthUserData).catch(() => { });
    }, []);
    // console.log(authUserData)

    const navElements = [
        {
            name: "Dashboard",
            link: "/"
        },
        {
            name: "Projects",
            link: "/projects"
        },
        // {
        //     name: "Tasks",
        //     link: "/tasks"
        // },
        {
            name: "Team",
            link: "/team"
        },
    ];

    const location = useLocation();

    // Simple skeleton for user info while loading or if error
    const renderUserInfo = () => {
        if (!authUserData) {
            return (
                <div className='flex flex-col border-r border-gray-200 dark:border-gray-700 pr-3'>
                    <span className='text-sm font-bold text-gray-400 dark:text-gray-500 animate-pulse'>Loading...</span>
                    <span className='text-xs text-gray-400 dark:text-gray-600'>-</span>
                </div>
            );
        }
        return (
            <div className='flex flex-col border-r border-gray-200 dark:border-gray-700 pr-3'>
                <span className='text-sm font-bold text-gray-900 dark:text-white'>
                    {authUserData.name} {authUserData.surname}
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>{authUserData.role}</span>
            </div>
        );
    };

    return (
        <nav className='flex justify-between items-center rounded-b-md shadow-md bg-white dark:bg-gray-900 gap-2 p-2'>
            <ul className='flex items-center gap-2'>
                {navElements.map(({ name, link }) => (
                    <Button
                        key={link}
                        variant={location.pathname === link ? "primary" : "ghost"}
                    >
                        <Link to={link}>{name}</Link>
                    </Button>
                ))}
            </ul>

            <div className="flex items-center gap-2">
                {/* User data: */}
                {renderUserInfo()}
                <Link to="/settings">
                    <Button icon={<Settings />} variant='ghost' />
                </Link>
            </div>
        </nav>

    );
}
