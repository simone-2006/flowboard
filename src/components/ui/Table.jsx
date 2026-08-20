export function Table({ columns, children }) {
    return (
        <div className="overflow-x-auto rounded">
            <table className="w-full text-sm border-separate border-spacing-y-1 table-fixed">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                        {columns.map((column, index) => (
                            <th
                                key={column.key || column.label}
                                className={`${column.width || "w-1/4"} text-left px-2 py-1 ${index === 0 ? "rounded-l" : ""} ${index === columns.length - 1 ? "rounded-r" : ""}`}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}

export function TableRow({ children, completed = false, highlight = false, className = "" }) {
    return (
        <tr
            className={`group border-b border-gray-200 dark:border-gray-600 transition-colors text-gray-900 dark:text-gray-200 ${highlight
                    ? "bg-yellow-50 dark:bg-yellow-900/20"
                    : completed
                        ? "bg-green-200/60 dark:bg-green-900/40"
                        : "hover:bg-blue-50 dark:hover:bg-blue-900/30"
                } ${className}`}
        >
            {children}
        </tr>
    );
}

export function TableCell({ children, width = "w-1/4", className = "" }) {
    return (
        <td className={`${width} px-2 py-1 ${className}`}>
            {children}
        </td>
    );
}

export function TableEmpty({ colSpan, children }) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-2 py-3 text-sm text-gray-500 dark:text-gray-300">
                {children}
            </td>
        </tr>
    );
}
