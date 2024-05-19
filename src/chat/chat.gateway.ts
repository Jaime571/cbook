import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';

import { Socket, Server } from 'socket.io';
import { WebsocketExceptionFilter } from './ws-exception.filter';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway(3502, {
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('text-chat')
  @UsePipes(new ValidationPipe())
  handleNewMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() _client: Socket,
  ) {
    this.server.emit('text-chat', {
      ...message,
      time: new Date().toDateString(),
    });
  }
}
