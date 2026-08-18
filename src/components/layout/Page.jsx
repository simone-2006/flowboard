export default function Page({ children }) {
    return (
        <div className="m-2 rounded-md shadow-md min-h-[calc(100vh-60px)] bg-white dark:bg-gray-900 p-2">
            {/* <h3 className="font-bold text-2xl my-2 flex items-center justify-between">{title}</h3> */}
            {children}
        </div>
    );
}