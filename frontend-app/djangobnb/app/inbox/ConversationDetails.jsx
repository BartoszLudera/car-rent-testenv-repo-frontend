export default function ConversationDetails(){
    return (
        <>
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
            Conversation Details
        </div>
            {/* <div 
                // ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%]py-4 px-6 rounded-xl ${message.created_by.name == myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                    >
                        <p className="font-bold text-gray-500">{message.created_by.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

                {realtimeMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%]py-4 px-6 rounded-xl ${message.name == myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                    >
                        <p className="font-bold text-gray-500">{message.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <CustomButton 
                    label='Send'
                    onClick={sendMessage}
                    className="w-[100px]"
                />
            </div> */}
        </>
    )
}