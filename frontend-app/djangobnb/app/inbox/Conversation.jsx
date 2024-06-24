export default function Conversation(){
    return (
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
            <p className="mb-6 text-xl">User name</p>

            <p 
                // onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-airbnb-dark"
            >
                Go to conversation
            </p>
        </div>
    )
}