import Button from './ui/button'

export default function MessageBox({ handleSubmit, waiting }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 items-center justify-between gap-4 border-t border-zinc-700 bg-zinc-800 px-48 py-4"
        >
            <div className="w-full max-w-5xl">
                <input
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Enter your queries..."
                    className="w-full rounded-full border-2 border-zinc-700 bg-transparent px-6 py-2.5 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button disabled={waiting}>
                {waiting ? (
                    <span className="loading loading-dots loading-md"></span>
                ) : (
                    'Send'
                )}
            </Button>
        </form>
    )
}
