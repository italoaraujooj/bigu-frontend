import { api } from "./api"; // seu axios ou fetch wrapper

export const fetchUserConversations = async (userId: string) => {
  return api.get(`/chat/conversations/${userId}`);
};

export const fetchMessages = async (chatRoomId: string) => {
  return api.get(`/chat/messages/${chatRoomId}`);
};

export const sendMessage = async (chatRoomId: string, content: string, userId?: string) => {
  return api.post(`/chat/messages`, {
    chatRoom: chatRoomId,
    content,
    sender: userId,
  });
};

export const createOrGetChatRoom = async (
  rideId: string,
  userId: string,
  participantId: string
) => {
  return api.post(`/chat/create-or-get-room`, {
    rideId,
    userId,
    participantId,
  });
};
