import { createContext, useContext, useState } from 'react';
import { showAlert } from '../components/ui/Alert';
import { useEffect } from 'react';

import useSound from 'use-sound';
import dingSound from '../sound/Ding.mp3';

const initialProjects = [


    {
        id: 2,
        name: 'Organizzare la settimana',
        description: 'Mettere in ordine le cose da fare durante la settimana.',
        color: 'green',
        creatorID: 1,
        status: 'active',
        dueDate: '2026-08-23',
        tasks: [
            { id: 201, title: 'Fare la spesa', completed: true, dueDate: '2026-08-17' },
            { id: 202, title: 'Sistemare la camera', completed: false, dueDate: '2026-08-18' },
            { id: 203, title: 'Portare la macchina dal meccanico', completed: false, dueDate: '2026-08-19' },
            { id: 204, title: 'Pagare le bollette', completed: false, dueDate: '2026-08-20' },
            { id: 205, title: 'Sistemare alcune cose al computer', completed: false, dueDate: '2026-08-21' },
            { id: 206, title: 'Organizzare il weekend', completed: false, dueDate: '2026-08-22' }
        ]
    },

    {
        id: 3,
        name: 'Progetto personale React',
        description: 'Sviluppare un piccolo progetto per fare pratica con React.',
        color: 'purple',
        creatorID: 1,
        status: 'active',
        dueDate: '2026-08-25',
        tasks: [
            { id: 301, title: 'Creare il progetto con Vite', completed: true, dueDate: '2026-08-17' },
            { id: 302, title: 'Impostare la struttura delle cartelle', completed: true, dueDate: '2026-08-17' },
            { id: 303, title: 'Creare la navbar', completed: true, dueDate: '2026-08-18' },
            { id: 304, title: 'Creare la pagina dei progetti', completed: false, dueDate: '2026-08-19' },
            { id: 305, title: 'Aggiungere i filtri', completed: false, dueDate: '2026-08-20' },
            { id: 306, title: 'Salvare i dati in localStorage', completed: false, dueDate: '2026-08-21' },
            { id: 307, title: 'Sistemare la versione mobile', completed: false, dueDate: '2026-08-23' },
            { id: 308, title: 'Fare un ultimo controllo generale', completed: false, dueDate: '2026-08-25' }
        ]
    },

    {
        id: 4,
        name: 'Preparare una serata',
        description: 'Organizzare tutto quello che serve per una serata con amici.',
        color: 'orange',
        creatorID: 1,
        status: 'planning',
        dueDate: '2026-08-29',
        tasks: [
            { id: 401, title: 'Decidere dove andare', completed: true, dueDate: '2026-08-20' },
            { id: 402, title: 'Sentire gli altri', completed: false, dueDate: '2026-08-21' },
            { id: 403, title: 'Prenotare il tavolo', completed: false, dueDate: '2026-08-23' },
            { id: 404, title: 'Organizzare le macchine', completed: false, dueDate: '2026-08-27' },
            { id: 405, title: 'Controllare l orario', completed: false, dueDate: '2026-08-28' }
        ]
    },

    {
        id: 5,
        name: 'Sistemare il PC',
        description: 'Fare un po’ di manutenzione e sistemare le cose lasciate indietro.',
        color: 'red',
        creatorID: 1,
        status: 'planning',
        dueDate: '2026-09-05',
        tasks: [
            { id: 501, title: 'Fare il backup dei file importanti', completed: false, dueDate: '2026-08-24' },
            { id: 502, title: 'Eliminare i programmi inutilizzati', completed: false, dueDate: '2026-08-25' },
            { id: 503, title: 'Sistemare le cartelle dei progetti', completed: false, dueDate: '2026-08-27' },
            { id: 504, title: 'Controllare gli aggiornamenti', completed: false, dueDate: '2026-08-29' },
            { id: 505, title: 'Fare una pulizia generale', completed: false, dueDate: '2026-09-01' }
        ]
    },

    {
        id: 6,
        name: 'Vacanza',
        description: 'Organizzare le cose da fare prima di partire.',
        color: 'pink',
        creatorID: 1,
        status: 'Completed',
        dueDate: '2026-07-28',
        tasks: [
            { id: 601, title: 'Prenotare hotel', completed: true, dueDate: '2026-07-05' },
            { id: 602, title: 'Controllare i documenti', completed: true, dueDate: '2026-07-10' },
            { id: 603, title: 'Preparare la valigia', completed: true, dueDate: '2026-07-25' },
            { id: 604, title: 'Controllare il viaggio', completed: true, dueDate: '2026-07-26' },
            { id: 605, title: 'Preparare caricabatterie e cuffie', completed: true, dueDate: '2026-07-27' },
            { id: 606, title: 'Partire', completed: true, dueDate: '2026-07-28' }
        ]
    },

    {
        id: 1,
        name: 'Cercare lavoro',
        description: 'Organizzare la ricerca di un lavoro e tenere traccia delle candidature.',
        color: 'blue',
        creatorID: 1,
        status: 'active',
        dueDate: '2026-09-30',
        tasks: [
            { id: 101, title: 'Sistemare il curriculum', completed: true, dueDate: '2026-08-20' },
            { id: 102, title: 'Aggiornare LinkedIn', completed: true, dueDate: '2026-08-21' },
            { id: 103, title: 'Cercare aziende interessanti', completed: true, dueDate: '2026-08-25' },
            { id: 104, title: 'Mandare le prime candidature', completed: false, dueDate: '2026-08-28' },
            { id: 105, title: 'Prepararsi per i colloqui', completed: false, dueDate: '2026-09-05' },
            { id: 106, title: 'Fare il punto sulle candidature', completed: false, dueDate: '2026-09-15' }
        ]
    },
];

const AppContext = createContext(null);

const initialUsers = [
    {
        id: 1,
        name: "Simone",
        surname: "Penza",
        role: "Developer"
    },
    {
        id: 2,
        name: "Mario",
        surname: "Rossi",
        role: "Project Manager"
    },
    {
        id: 3,
        name: "Luca",
        surname: "Bianchi",
        role: "Designer"
    },
    {
        id: 4,
        name: "Giulia",
        surname: "Verdi",
        role: "Tester"
    },
    {
        id: 5,
        name: "Alessandro",
        surname: "Russo",
        role: "DevOps"
    }
]

export function AppProvider({ children }) {
    {/* Auth */ }
    {/* Autenticazione per ora sarà finta, e saremo dentro con l'utente che ha id 1 */ }
    //corretto la gestione dello stato di authUserData evitando di chiamare setAuthUserData direttamente nel body del componente (che causerebbe cicli infiniti e warning di React). 
    // Ora viene inizializzato con l'utente di default (id 1) e aggiornato tramite useEffect ogni volta che authUserID cambia.
    const [authUserID, setAuthUserID] = useState(2);
    const [authUserData, setAuthUserData] = useState(
        initialUsers.find(user => user.id === 1)
    );

    useEffect(() => {
        setAuthUserData(initialUsers.find(user => user.id === authUserID));
    }, [authUserID]);

    {/* PROJECTS */ }
    const [projects, setProjects] = useState(initialProjects);

    const [playDing] = useSound(dingSound);

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
        const updatedProject = projects.find(project => project.id === projectId);
        const updatedTask = updatedProject?.tasks.find(task => task.id === taskId);
        if (updatedTask && !updatedTask.completed) {
            showAlert("Task marked as completed", "success");
            playDing();
        } else if (updatedTask && updatedTask.completed) {
            showAlert("Task marked as incomplete", "info");
        } else {
            showAlert("Task not found", "warning");
        }
    };

    // Funzione per aggiungere un nuovo progetto all'elenco dei progetti
    const addProject = (newProject) => {
        // Otteniamo un nuovo ID incrementale
        const newId = projects.length > 0
            ? Math.max(...projects.map(p => p.id)) + 1
            : 1;

        // Costruiamo un oggetto progetto completo includendo le proprietà richieste
        const projectToAdd = {
            ...newProject,
            id: newId,             // Assegniamo il nuovo ID
            creatorID: authUserID       // Prende id utente loggato
        };

        // Aggiorniamo lo stato dei progetti aggiungendo quello nuovo in coda
        setProjects(prevProjects => [...prevProjects, projectToAdd]);

        // Possibile punto per mostrare una notifica/toast o riprodurre un suono
        showAlert('Project created successfully', 'success');
        playDing();
        return 1;
    }

    {/* USERS */ }
    const [users, setUsers] = useState(initialUsers);

    return (
        <AppContext.Provider value={{ authUserData, users, projects, setProjects, toggleTask, addProject }}>
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
