import { createContext, useContext, useState } from 'react';

const initialProjects = [
    {
        id: 1,
        name: 'Project Alpha',
        description: 'Development of the new Alpha platform.',
        color: 'purple',
        manager: 'Simone',
        status: 'Active',
        dueDate: '2016-09-15',
        tasks: [
            { id: 101, title: 'Design wireframes', completed: true, dueDate: '2016-06-30' },
            { id: 102, title: 'Prototype UI', completed: true, dueDate: '2016-07-08' },
            { id: 103, title: 'Implement backend API', completed: false, dueDate: '2016-07-12' },
            { id: 104, title: 'Set up CI/CD', completed: true, dueDate: '2016-07-15' },
            { id: 105, title: 'User testing', completed: false, dueDate: '2016-08-01' },
            { id: 106, title: 'Final review meeting', completed: false, dueDate: '2016-09-13' },
            { id: 107, title: 'Deploy to production', completed: false, dueDate: '2016-09-15' },
        ]
    },
    {
        id: 2,
        name: 'Project Beta',
        description: 'Migration to Beta infrastructure.',
        color: 'green',
        manager: 'Luca',
        status: 'Planning',
        dueDate: '2016-10-01',
        tasks: [
            { id: 201, title: 'Prepare migration plan', completed: true, dueDate: '2016-07-01' },
            { id: 202, title: 'Setup servers', completed: true, dueDate: '2016-07-10' },
            { id: 203, title: 'Write migration scripts', completed: false, dueDate: '2016-07-18' },
            { id: 204, title: 'QA environment test', completed: false, dueDate: '2016-08-01' },
            { id: 205, title: 'Cut over data', completed: false, dueDate: '2016-09-01' },
            { id: 206, title: 'Post-migration checks', completed: false, dueDate: '2016-09-14' },
            { id: 207, title: 'Document new architecture', completed: false, dueDate: '2016-09-25' }
        ]
    },
    {
        id: 3,
        name: 'Project Gamma',
        description: 'Mobile app redesign for Gamma.',
        color: 'blue',
        manager: 'Martina',
        status: 'Active',
        dueDate: '2016-11-20',
        tasks: [
            { id: 301, title: 'Research user needs', completed: true, dueDate: '2016-07-05' },
            { id: 302, title: 'Sketch new UI', completed: true, dueDate: '2016-07-18' },
            { id: 303, title: 'Develop prototype', completed: false, dueDate: '2016-08-15' },
            { id: 304, title: 'Iterate on feedback', completed: false, dueDate: '2016-09-03' },
            { id: 305, title: 'Accessibility checks', completed: false, dueDate: '2016-09-15' },
            { id: 306, title: 'Release candidate', completed: false, dueDate: '2016-11-10' },
            { id: 307, title: 'App store deployment', completed: false, dueDate: '2016-11-20' }
        ]
    },
    {
        id: 4,
        name: 'Project Delta',
        description: 'Quarterly Marketing Push.',
        color: 'orange',
        manager: 'Alessandro',
        status: 'Completed',
        dueDate: '2016-06-20',
        tasks: [
            { id: 401, title: 'Campaign brainstorm', completed: true, dueDate: '2016-05-13' },
            { id: 402, title: 'Create visuals', completed: true, dueDate: '2016-05-28' },
            { id: 403, title: 'Schedule social posts', completed: true, dueDate: '2016-06-02' },
            { id: 404, title: 'Send newsletter', completed: true, dueDate: '2016-06-03' },
            { id: 405, title: 'Monitor campaign metrics', completed: true, dueDate: '2016-06-15' },
            { id: 406, title: 'Client follow-up', completed: true, dueDate: '2016-06-18' },
            { id: 407, title: 'Final campaign report', completed: true, dueDate: '2016-06-20' }
        ]
    },
    {
        id: 5,
        name: 'Project Epsilon',
        description: 'Research and development for Epsilon AI engine.',
        color: 'pink',
        manager: 'Valeria',
        status: 'Planning',
        dueDate: '2025-01-15',
        tasks: [
            { id: 501, title: 'Literature review', completed: false, dueDate: '2016-08-10' },
            { id: 502, title: 'Data collection', completed: false, dueDate: '2016-09-01' },
            { id: 503, title: 'Initial model training', completed: false, dueDate: '2016-10-15' },
            { id: 504, title: 'Test model benchmarks', completed: false, dueDate: '2016-11-10' },
            { id: 505, title: 'Iterate model tuning', completed: false, dueDate: '2016-12-10' },
            { id: 506, title: 'Pilot project', completed: false, dueDate: '2025-01-10' },
            { id: 507, title: 'Results documentation', completed: false, dueDate: '2025-01-15' }
        ]
    }
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [projects, setProjects] = useState(initialProjects);

    //toggle task status
    const toggleTask = (projectId, taskId) => {
        setProjects(prev =>
            prev.map(project =>
                project.id !== projectId
                    ? project
                    : {
                        ...project,
                        tasks: project.tasks.map(task =>
                            task.id !== taskId
                                ? task
                                : { ...task, completed: !task.completed }
                        ),
                    }
            )
        );
    };

    return (
        <AppContext.Provider value={{ projects, setProjects, toggleTask }}>
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
