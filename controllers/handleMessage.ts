import { WebSocket } from 'ws';
import { connectionHandler } from './connectionHandler';
import { AWSS, Message, WSExtended } from 'types';
import { broadcastConnection } from './broadcastConnection';

export const handleMessage = (ws: WebSocket, msg: string, aWss: AWSS) => {
  const message = <Message>JSON.parse(msg);
  const ws2 = ws as unknown as WSExtended;

  switch (message.method) {
    case 'connection':
      connectionHandler(ws2, message, aWss);
      break;
    case 'draw':
      broadcastConnection(ws2, message, aWss);
      break;
  }
};
