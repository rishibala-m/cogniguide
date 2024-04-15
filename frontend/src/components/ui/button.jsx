export default function Button({ children, className, ...props }) {
    return (
        <button
            className={`grid place-items-center rounded-full bg-zinc-900 px-7 py-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
