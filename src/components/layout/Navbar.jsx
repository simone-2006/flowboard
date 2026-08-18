/*
    Dashboard
    Projects
    Tasks
    Team
    Settings
*/
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

import { useAppContext } from '../../context/appContext';

import { Settings } from 'lucide-react';

export default function Navbar() {
    const { authUserData } = useAppContext()
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

    return (
        <nav className='flex justify-between items-center rounded-md shadow-md bg-white dark:bg-gray-900 gap-2 p-2 m-2'>
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
                <div className='flex flex-col border-r border-gray-200 dark:border-gray-700 pr-3'>
                    <span className='text-sm font-bold text-gray-900 dark:text-white'>{authUserData.name} {authUserData.surname}</span>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>{authUserData.role}</span>
                </div>
                <Link to="/settings">
                    <Button icon={<Settings />} variant='ghost' />
                </Link>
            </div>
        </nav>

    );
}