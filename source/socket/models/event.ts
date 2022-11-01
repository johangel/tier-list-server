import { TLUser } from '../../user/user.models';

export interface TLSocketEventsPayload {
  assignName: { name: string };
  assignNameConfirmed: { user: TLUser };
  assignNameError: { error: string };
  assignOnlineStatus: { onlineStatus: boolean };
  assignOnlineStatusConfirmed: { user: TLUser };
  assignOnlineError: { error: string };
  updateUsersRoomList: { list: TLUser[] };
}
