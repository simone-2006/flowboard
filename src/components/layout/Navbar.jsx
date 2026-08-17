/*
    Dashboard
    Projects
    Tasks
    Team
    Settings
*/
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

export default function Navbar() {
    const navElements = [
        {
            name: "Dashboard",
            link: "/"
        },
        {
            name: "Projects",
            link: "/projects"
        },
        {
            name: "Tasks",
            link: "/tasks"
        },
        {
            name: "Team",
            link: "/team"
        },
        {
            name: "Settings",
            link: "/settings"
        },
    ];

    const location = useLocation();

    return (
        <nav>
            <ul className='flex items-center gap-2 p-2 m-2 rounded-md shadow-md bg-white'>
                {navElements.map(({ name, link }) => (
                    <Button
                        key={link}
                        variant={location.pathname === link ? "primary" : "ghost"}
                    >
                        <Link to={link}>{name}</Link>
                    </Button>
                ))}
            </ul>
        </nav>
    );
}