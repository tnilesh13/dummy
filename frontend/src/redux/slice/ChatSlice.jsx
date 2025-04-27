import { createSlice } from "@reduxjs/toolkit";
import { getFriendList, getMessages, loadMoreMessagesThunk } from "../thunk/ChatThunk";

const initialState = {
    // chatData: {},
    // senderId: '',
    // newMessageData: {},
    // unReadCount: {},
    // editedChats: {}.
    messages: [],
    // users: [],
    selectedUser: null,
    isMessagesLoading: false,
    totalMessages: 0,    //totalCount
    messageCurrentPage: 1,
    messageTotalPages: 0,

    friends: [],
    isFriendsLoading: false,
    friendsStatus: "idle",
    currentPageFriends: 1,
    totalFriends: 0,
    friendsTotalPages: 0,
};

const ChatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // setChatData: (state, action) => {
        //     state.chatData = action.payload;
        // },
        // setchatArray: (state, action) => {
        //     if (state.chatData) {
        //         state.chatData?.chat?.push(action.payload?.createdData?.chat)
        //     } else {
        //         state.chatData = { ...action.payload?.createdData, chat: [] }
        //         state.chatData?.chat?.push(action.payload?.createdData?.chat)
        //     }
        // },
        // setsenderIdtostore: (state, action) => {
        //     state.senderId = action.payload;
        // },
        // setfetchNewMessage: (state, action) => {
        //     state.newMessageData = action.payload;
        // },
        // seteditedChats: (state, action) => {
        //     if (action.payload.id) {
        //         return {
        //             ...state,
        //             editedChats: {
        //                 ...state.editedChats,
        //                 [action.payload?.id]: true,
        //             },
        //         };
        //     } else {
        //         return { editedChats: {} };
        //     }
        // },
        // setunreadCount: (state, action) => {
        //     if (action.payload.createdData) {
        //         return {
        //             ...state,
        //             unreadCount: {
        //                 ...state.unreadCount,
        //                 [action.payload?.createdData?.sender?.id]: state.unreadCount[action.payload?.createdData?.sender?.id] + 1 || 0 + 1,
        //             },
        //         };
        //     } else if (action.payload.id) {
        //         return {
        //             ...state,
        //             unreadCount: {
        //                 ...state.unreadCount,
        //                 [action.payload.id]: 0,
        //             },
        //         };
        //     } else {
        //         return { unreadCount: {} };
        //     }

        // }
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
            state.messages = [];
            state.messageCurrentPage = 1;
            state.totalMessages = 0;
        },

        pushNewMessage: (state, action) => {
            state.messages.push(action.payload);
            state.totalMessages += 1;
        },

        prependOlderMessages: (state, action) => {
            state.messages = [...action.payload, ...state.messages];
            state.messageCurrentPage += 1;
        },

        clearChatState: (state) => {
            state.messages = [];
            state.selectedUser = null;
            state.messageCurrentPage = 1;
            state.totalMessages = 0;
        },
        updateMessageStatus: (state, action) => {
            const { tempId, newMessage } = action.payload;
            const index = state.messages.findIndex(msg => msg._id === tempId);
            if (index !== -1) {
                state.messages[index] = { ...newMessage, isSending: false };
            }
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getFriendList.pending, (state) => {
                state.friendsStatus = "loading";
                state.isFriendsLoading = true;
            })
            .addCase(getFriendList.fulfilled, (state, action) => {
                state.friendsStatus = "succeeded";
                state.isFriendsLoading = false;
                state.currentPageFriends = action.payload?.result?.currentPage || 1;
                state.friends = action.payload?.result?.friends || [];
                state.totalFriends = action.payload?.result?.totalPages || 0;
            })
            .addCase(getFriendList.rejected, (state, action) => {
                state.friendsStatus = "failed";
                state.isFriendsLoading = false;
                state.error = action.payload;
            })
            .addCase(getMessages.pending, (state) => {
                state.isMessagesLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                const { messages, totalMessages, currentPage, totalPages } = action.payload?.result || {};

                // state.messages = action.payload?.result?.messages || [];
                state.isMessagesLoading = false;
                state.totalMessages = totalMessages || 0;
                state.messageCurrentPage = currentPage || 1;
                state.messageTotalPages = totalPages || 0;

                if (currentPage === 1 || currentPage === "1") {
                    state.messages = messages || [];
                } else {
                    state.messages = [...messages, ...state.messages];
                }
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.isMessagesLoading = false;
                state.error = action.payload;
            })
            .addCase(loadMoreMessagesThunk.pending, (state) => {
                // state.isMessagesLoading = true;
            })
            .addCase(loadMoreMessagesThunk.fulfilled, (state, action) => {
                const { messages, totalMessages, currentPage, totalPages } = action.payload?.result || {};

                state.totalMessages = totalMessages || state.totalMessages;
                state.messageCurrentPage = currentPage || state.messageCurrentPage;
                state.messageTotalPages = totalPages || state.messageTotalPages;

                state.messages = [...messages, ...state.messages]; // Prepend older messages
            })
            .addCase(loadMoreMessagesThunk.rejected, (state, action) => {
                console.log("loadMoreMessages failed:", action.payload);
            })
});

// setChatData, setchatArray, setsenderIdtostore, setfetchNewMessage, setunreadCount, seteditedChats
export const { setSelectedUser, pushNewMessage, prependOlderMessages, clearChatState, updateMessageStatus } = ChatSlice.actions;
export default ChatSlice.reducer;
