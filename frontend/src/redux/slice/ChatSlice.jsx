import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatData: {},
    senderId: '',
    newMessageData: {},
    unReadCount: {},
    editedChats: {}
};

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatData: (state, action) => {
            state.chatData = action.payload;
        },
        setchatArray: (state, action) => {
            if (state.chatData) {
                state.chatData?.chat?.push(action.payload?.createdData?.chat)
            } else {
                state.chatData = { ...action.payload?.createdData, chat: [] }
                state.chatData?.chat?.push(action.payload?.createdData?.chat)
            }
        },
        setsenderIdtostore: (state, action) => {
            state.senderId = action.payload;
        },
        setfetchNewMessage: (state, action) => {
            state.newMessageData = action.payload;
        },
        seteditedChats: (state, action) => {
            if (action.payload.id) {
                return {
                    ...state,
                    editedChats: {
                        ...state.editedChats,
                        [action.payload?.id]: true,
                    },
                };
            } else {
                return { editedChats: {} };
            }
        },
        setunreadCount: (state, action) => {
            if (action.payload.createdData) {
                return {
                    ...state,
                    unreadCount: {
                        ...state.unreadCount,
                        [action.payload?.createdData?.sender?.id]: state.unreadCount[action.payload?.createdData?.sender?.id] + 1 || 0 + 1,
                    },
                };
            } else if (action.payload.id) {
                return {
                    ...state,
                    unreadCount: {
                        ...state.unreadCount,
                        [action.payload.id]: 0,
                    },
                };
            } else {
                return { unreadCount: {} };
            }

        }
    },
}
)

export const { setChatData, setchatArray, setsenderIdtostore, setfetchNewMessage, setunreadCount, seteditedChats } = ChatSlice.actions
export default ChatSlice.reducer
