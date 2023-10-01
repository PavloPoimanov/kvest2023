export function IconButton({
                               onClick,
                               children,
                               className,
                               btnClassName = `flex gap-2 items-center focus:outline-none bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-600 rounded-full p-2`
                           }) {
    return (
        <div className={className}>
            <button
                onClick={onClick}
                className={btnClassName}
            >
                {children}
            </button>
        </div>
    );
}
