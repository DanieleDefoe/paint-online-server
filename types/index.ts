import { IncomingMessage } from 'http';
import { Server, WebSocket } from 'ws';

export type Method = 'connection' | 'draw';

export interface Message {
  message: string;
  id: number;
  username: string;
  method: Method;
}

export type WSExtended = typeof WebSocket & {
  id?: number;
};

export type AWSS = Server<WSExtended, typeof IncomingMessage>;
