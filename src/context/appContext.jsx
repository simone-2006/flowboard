import { createContext, useContext, useState } from 'react';

const initialProjects = [
    {
        id: 1,
        name: 'Project Alpha',
        description: 'Development of the new Alpha platform.',
        color: 'purple',
        manager: 'Simone',
        status: 'Active',
        tasks: [
            {
                id: 101,
                title: 'Design wireframes',
                completed: false,
                dueDate: '2024-06-30',
            },
            {
                id: 102,
                title: 'Prototype UI',
                completed: true,
                dueDate: '2024-06-30',
            },
        ],
    },
    {
        id: 3,
        name: 'Project Beta',
        description: 'Migration to Beta infrastructure.',
        color: 'green',
        manager: 'Luca',
        dueDate: '2024-08-15',
        status: 'Planning',
        tasks: [
            {
                id: 201,
                title: 'Setup servers',
                completed: true,
                dueDate: '2024-06-30',
            },
            {
                id: 202,
                title: 'Write migration scripts',
                completed: false,
                dueDate: '2024-06-30',
            },
            {
                id: 203,
                title: 'QA environment test',
                completed: false,
                dueDate: '2024-06-30',
            },
        ],
    },
    {
        id: 2,
        name: 'Project Beta',
        description: 'Migration to Beta infrastructure.',
        color: 'green',
        manager: 'Luca',
        dueDate: '2024-08-15',
        status: 'Planning',
        tasks: [
            {
                id: 201,
                title: 'Setup servers',
                completed: false,
                dueDate: '2024-06-30',
            },
            {
                id: 202,
                title: 'Write migration scripts',
                completed: false,
                dueDate: '2024-06-30',
            },
            {
                id: 203,
                title: 'QA environment test',
                completed: false,
                dueDate: '2024-06-30',
            },
        ],
    },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [projects, setProjects] = useState(initialProjects);

    return (
        <AppContext.Provider value={{ projects, setProjects }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }

    return context;
}
