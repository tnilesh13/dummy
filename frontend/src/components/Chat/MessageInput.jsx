import { Image, Send, X } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import toast from 'react-hot-toast'
import { pushNewMessage } from '../../redux/slice/ChatSlice';
import { v4 as uuidv4 } from "uuid";

const MessageInput = ({ socketInstance }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.ChatReducer);
  const { currentUserDetails } = useSelector((state) => state.AuthReducer);

  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be under 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;

    const tempId = uuidv4();

    const newMessage = {
      senderId: currentUserDetails._id,
      receiverId: selectedUser._id,
      text: message.trim(),
      image: imagePreview,
      _id: tempId,
      createdAt: new Date().toISOString(),
      isSending: true, // sending
    };

    if (socketInstance && selectedUser) {
      socketInstance.emit("addNewMessage", { ...newMessage, tempId });
    }

    dispatch(pushNewMessage(newMessage));

    setMessage("");
    removeImage();
  };

  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="flex items-center gap-2 mb-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex items-center justify-center rounded-full w-10 h-10 border border-transparent ${imagePreview ? "text-green-500" : "text-zinc-400"
              } hover:bg-zinc-100 transition`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center rounded-full w-9 h-9 bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          disabled={!message.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
