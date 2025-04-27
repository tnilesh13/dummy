import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gray-700">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-gray-400 flex items-center
             justify-center animate-bounce"
                        >
                            <MessageSquare className="w-8 h-8 text-white " />
                        </div>
                    </div>
                </div>

                <h2 className="text-white text-2xl font-bold">Welcome to Connectify!</h2>
                <p className="text-white">
                    Start Conversation Now
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;
