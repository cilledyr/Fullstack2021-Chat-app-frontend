import {ChatUser} from './chat-user.model';
import {ChatMessage} from './chat-message.model';

export interface WelcomeDto {
  allUsers: ChatUser[];
  thisClient: ChatUser;
  allMessages: ChatMessage[];
}
