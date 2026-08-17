export default function Page({ title = "", children }) {
    return (
        <div className="m-2 rounded-md shadow-md min-h-[calc(100vh-60px)]">
            <h3 className="font-bold text-xl">{title}</h3>
            {children}
        </div>
    );
}