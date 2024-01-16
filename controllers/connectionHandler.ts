import { AWSS, Message, WSExtended } from 'types';
import { broadcastConnection } from './broadcastConnection';

export const connectionHandler = (ws: WSExtended, msg: Message, aWss: AWSS) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg, aWss);
};
