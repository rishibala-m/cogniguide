import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatMessage({ message }) {
    const imageUrl =
        message.role === 'user'
            ? 'https://api.dicebear.com/7.x/big-ears-neutral/svg?seed=Sam'
            : 'https://api.dicebear.com/7.x/bottts/svg?seed=Precious'

    return (
        <div
            className={`relative flex w-fit gap-2 ${message.role === 'user' ? 'flex-row-reverse place-self-end' : 'place-self-start'}`}
        >
            <img
                className="h-10 w-10 rounded-full border border-zinc-400"
                src={imageUrl}
                alt="Rounded avatar"
            />
            <div className="max-w-2xl rounded-2xl bg-zinc-900 px-6 py-4">
                <article className="prose prose-zinc prose-invert">
                    <Markdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </Markdown>
                </article>
            </div>
        </div>
    )
}
