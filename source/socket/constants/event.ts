import { StrictEventEmitter } from 'socket.io/dist/typed-events';

export enum TLUserSocketEventsENUM {
  ASSIGN_NAME = 'assignName',
  ASSIGN_NAME_CONFIRMED = 'assignNameConfirmed',
  ASSIGN_NAME_ERROR = 'assignNameError',
  ASSIGN_ONLINE_STATUS = 'assignOnlineStatus',
  ASSIGN_ONLINE_STATUS_CONFIRMED = 'assignOnlineStatusConfirmed',
  ASSIGN_ONLINE_STATUS_ERROR = 'assignOnlineStatusError',
  UPDATE_USERS_ROOM_LIST = 'updateUsersRoomList',
}

export enum TLSocketRoomsENUM {
  LOBBY = 'lobby',
}
