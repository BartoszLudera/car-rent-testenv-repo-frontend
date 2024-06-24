import ConversationDetails from "../ConversationDetails";

export default function ConversationPage() {
  return (
    <>
            <div 
                // ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4 pt-28"
            >
                {/* {messages.map((message, index) => ( */}
                    <div
                        // key={index}
                        className={`w-[80%]py-4 px-6 rounded-xl ml-[20%] bg-blue-200`}
                    >
                        <p className="font-bold text-gray-500">created by</p>
                        <p>message body</p>
                    </div>
                {/* ))} */}

                {/* {realtimeMessages.map((message, index) => ( */}
                    <div
                        // key={index}
                        className={`w-[80%]py-4 px-6 rounded-xl bg-gray-200`}
                    >
                        <p className="font-bold text-gray-500">message name</p>
                        <p>masage body</p>
                    </div>
                {/* ))} */}
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    // value={newMessage}
                    // onChange={(e) => setNewMessage(e.target.value)}
                />

                {/* <CustomButton 
                    label='Send'
                    onClick={sendMessage}
                    className="w-[100px]"
                /> */}
            </div>
        </>
  );
}
