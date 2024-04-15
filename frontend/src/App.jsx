import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import ChatMessage from './components/chat-message'
import MessageBox from './components/message-box'
// import { messages } from './data/messages'

const socket = io('http://localhost:8080')
export default function App() {
    const [messages, setMessages] = useState([])
    const [waiting, setWaiting] = useState(false)

    useEffect(() => {
        socket.on('response', (message) => {
            setMessages([...messages, { role: 'assistant', content: message }])
            setWaiting(false)
        })
    }, [messages])

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const message = formData.get('message')
        if (message) {
            setWaiting(true)
            setMessages([...messages, { role: 'user', content: message }])
            socket.emit('message', message)
            form.reset()
        }
    }

    return (
        <main className="relative grid h-[92vh] w-full overflow-hidden rounded-xl bg-zinc-800">
            <div
                className="relative mb-20 grid w-full gap-2 overflow-y-scroll p-6"
                style={{ scrollbarWidth: 'none' }}
            >
                {messages.map((message, i) => (
                    <ChatMessage key={i} message={message} />
                ))}
            </div>
            <MessageBox handleSubmit={handleSubmit} waiting={waiting} />
        </main>
    )
}
