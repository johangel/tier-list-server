import { TLUser } from './../user/user.models';
import { TLUserSocketEventsENUM, TLSocketRoomsENUM } from './constants/event';
import { Server, Socket } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { TLSocketEventsPayload } from './models/event';

export class TLSocketServer {
  io!: Server;

  constructor(public server: HttpServer) {
    this.initialize(server);
  }

  private initialize(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.domain,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    this.io.on('connection', (socket) => {
      socket.join(TLSocketRoomsENUM.LOBBY);
      this.setUserEvents(socket);
    });
  }

  private setUserEvents(socket: Socket): void {
    let user!: TLUser;
    socket.on(TLUserSocketEventsENUM.ASSIGN_NAME, (message: TLSocketEventsPayload[TLUserSocketEventsENUM.ASSIGN_NAME]) => {
      try {
        user = { name: message.name, online: true };
        socket.data = user;
        socket.emit(TLUserSocketEventsENUM.ASSIGN_NAME_CONFIRMED, { user: socket.data } as TLSocketEventsPayload[TLUserSocketEventsENUM.ASSIGN_NAME_CONFIRMED]);
        this.emitUpdatedRoomList(socket);
      } catch (error) {
        socket.emit(TLUserSocketEventsENUM.ASSIGN_NAME_ERROR);
      }
    });

    socket.on(TLUserSocketEventsENUM.ASSIGN_ONLINE_STATUS, (message: TLSocketEventsPayload[TLUserSocketEventsENUM.ASSIGN_ONLINE_STATUS]) => {
      try {
        user = { ...(socket.data as TLUser), online: message.onlineStatus };
        socket.data = user;
        socket.emit(TLUserSocketEventsENUM.ASSIGN_ONLINE_STATUS_CONFIRMED, {
          user: socket.data,
        } as TLSocketEventsPayload[TLUserSocketEventsENUM.ASSIGN_ONLINE_STATUS_CONFIRMED]);
        this.emitUpdatedRoomList(socket);
      } catch (error) {
        socket.emit(TLUserSocketEventsENUM.ASSIGN_ONLINE_STATUS_ERROR);
      }
    });
  }

  private async emitUpdatedRoomList(socket: Socket) {
    const list = await this.io.in(TLSocketRoomsENUM.LOBBY).fetchSockets();
    const users = list.map((socket) => socket.data).filter((user) => !!user.name);
    this.io
      .in(TLSocketRoomsENUM.LOBBY)
      .emit(TLUserSocketEventsENUM.UPDATE_USERS_ROOM_LIST, { list: users } as TLSocketEventsPayload[TLUserSocketEventsENUM.UPDATE_USERS_ROOM_LIST]);
  }
}
