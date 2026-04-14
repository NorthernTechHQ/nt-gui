// Copyright 2022 Northern.tech AS
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
import { useCallback, useEffect, useRef, useState } from 'react';

import { blobToString, byteArrayToString } from '@northern.tech/utils/helpers';
import msgpack5 from 'msgpack5';
import Cookies from 'universal-cookie';

import { DEVICE_MESSAGE_PROTOCOLS as MessageProtocols, DEVICE_MESSAGE_TYPES as MessageTypes, TIMEOUTS, apiUrl } from './constants';

const cookies = new Cookies();

const MessagePack = msgpack5();

type UseSessionProps = {
  onClose: (event: CloseEvent) => void;
  onHealthCheckFailed: () => void;
  onMessageReceived: (body: Uint8Array) => void;
  onNotify: (message: string) => void;
  onOpen: (isOpen: boolean) => void;
  token: string;
};

type MessageProps = {
  body?: Uint8Array;
  props: Record<string, string | number>;
  typ: string;
};

type SessionWebSocket = WebSocket & { sessionId?: string };

type UseSessionReturn = [
  connect: (deviceId: string) => void,
  sendMessage: (message: MessageProps) => void,
  close: () => void,
  readyState: number,
  sessionId: string | undefined
];

export const useSession = ({ onClose, onHealthCheckFailed, onMessageReceived, onNotify, onOpen, token }: UseSessionProps): UseSessionReturn => {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const healthcheckTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const socketRef = useRef<SessionWebSocket | undefined>(undefined);
  const sendMessage = useCallback(({ typ, body, props }: MessageProps): void => {
    if (!socketRef.current) {
      return;
    }
    const proto_header = { proto: MessageProtocols.Shell, typ, sid: socketRef.current.sessionId, props };
    const encodedData = MessagePack.encode({ hdr: proto_header, body });
    socketRef.current.send(encodedData);
  }, []);

  const close = useCallback((): void => {
    if (!socketRef.current || socketRef.current?.readyState !== WebSocket.OPEN) {
      return;
    }
    sendMessage({ typ: MessageTypes.Stop, props: {} });
    socketRef.current.close();
    setSessionId(undefined);
  }, [sendMessage]);

  const healthcheckFailed = useCallback((): void => {
    onHealthCheckFailed();
    close();
  }, [close, onHealthCheckFailed]);

  const onSocketMessage = useCallback(
    (event: MessageEvent): Promise<void> =>
      blobToString(event.data).then((data: unknown) => {
        const {
          hdr: { props = {} as Record<string, string | number>, proto, sid, typ },
          body
        } = MessagePack.decode(data as Buffer) as {
          body: Uint8Array;
          hdr: { props: Record<string, string | number>; proto: number; sid: string; typ: string };
        };
        if (proto !== MessageProtocols.Shell) {
          return;
        }
        switch (typ) {
          case MessageTypes.New: {
            if (props.status == WebSocket.CLOSING) {
              onNotify(`Error: ${byteArrayToString(body as unknown as Buffer)}`);
              setSessionId(undefined);
              return close();
            } else {
              clearTimeout(healthcheckTimeout.current);
              healthcheckTimeout.current = setTimeout(healthcheckFailed, 65 * TIMEOUTS.oneSecond);
              if (socketRef.current) {
                socketRef.current.sessionId = sid;
              }
              return setSessionId(sid);
            }
          }
          case MessageTypes.Shell:
            return onMessageReceived(body);
          case MessageTypes.Stop:
            return close();
          case MessageTypes.Ping: {
            if (healthcheckTimeout.current) {
              clearTimeout(healthcheckTimeout.current);
            }
            sendMessage({ typ: MessageTypes.Pong, props: {} });
            const timeout = parseInt(props.timeout as string);
            if (timeout > 0) {
              healthcheckTimeout.current = setTimeout(healthcheckFailed, timeout * TIMEOUTS.oneSecond);
            }
            return;
          }
          default:
            break;
        }
      }),
    [close, healthcheckFailed, onMessageReceived, onNotify, sendMessage]
  );

  const onSocketError = useCallback(
    (error: Event): void => {
      onNotify(`WebSocket error: ${(error as ErrorEvent).message || 'Unknown error'}`);
      close();
      clearTimeout(healthcheckTimeout.current);
    },
    [close, onNotify]
  );

  const onSocketOpen = useCallback((): void => {
    sendMessage({ typ: MessageTypes.New, props: {} });
    onOpen(true);
  }, [onOpen, sendMessage]);

  const onSocketClose = useCallback(
    (e: CloseEvent): void => {
      console.log('closing');
      onClose(e);
      close();
    },
    [close, onClose]
  );

  const connect = useCallback(
    (deviceId: string): void => {
      const uri = `wss://${window.location.host}${apiUrl.v1}/deviceconnect/devices/${deviceId}/connect`;
      setSessionId(undefined);
      cookies.set('JWT', token, { path: '/', secure: true, sameSite: 'strict', maxAge: 5 });
      try {
        socketRef.current = new WebSocket(uri);
      } catch (error) {
        console.log(error);
      }
    },
    [token]
  );

  useEffect(() => {
    const currentSocket = socketRef.current;
    if (!currentSocket) {
      return;
    }

    currentSocket.addEventListener('close', onSocketClose);
    currentSocket.addEventListener('error', onSocketError);
    currentSocket.addEventListener('message', onSocketMessage);
    currentSocket.addEventListener('open', onSocketOpen);

    return () => {
      currentSocket.removeEventListener('close', onSocketClose);
      currentSocket.removeEventListener('error', onSocketError);
      currentSocket.removeEventListener('message', onSocketMessage);
      currentSocket.removeEventListener('open', onSocketOpen);
    };
    // eslint-disable-next-line react-hooks/refs
  }, [onSocketClose, onSocketError, onSocketMessage, onSocketOpen, socketRef.current?.readyState]);

  // eslint-disable-next-line react-hooks/refs
  return [connect, sendMessage, close, socketRef.current?.readyState ?? WebSocket.CLOSED, sessionId];
};
