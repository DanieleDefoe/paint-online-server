import { AWSS, Message, WSExtended } from 'types';

export const broadcastConnection = (
  _ws: WSExtended,
  msg: Message,
  aWss: AWSS
) => {
  aWss.clients.forEach((client) => {
    if ((client as unknown as WSExtended).id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
