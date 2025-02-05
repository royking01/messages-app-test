export interface IMessage {
  name: string;
  message: string;
  id: string;
  createdAt: string;
}
export interface CreateMessageState {
  messages: Array<IMessage>;
  loading: boolean;
  error: string | null;
  success: boolean | null;
}
