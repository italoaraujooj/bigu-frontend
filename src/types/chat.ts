export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}
