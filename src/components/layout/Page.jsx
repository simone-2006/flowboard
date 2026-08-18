export default function Page({ children }) {
    return (
        <div className="m-2 rounded-md shadow-md min-h-[calc(100vh-60px)] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2">
            {/* <h3 className="font-bold text-2xl my-2 text-black dark:text-white flex items-center justify-between text-black dark:text-white">{title}</h3> */}
            {children}
        </div>
    );
}