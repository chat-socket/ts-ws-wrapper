/* tslint:disable:no-empty */

import {WebSocket} from "mock-socket";
import WebSocketWrapper from "../WebSocketWrapper";
import { connectSocket, createPayload, delay, getSendToSocketFn, getWebSocket } from "./utils";

describe("#once()", () => {
  const event = "event";
  const channel = "channel";
  let wsw: WebSocketWrapper;
  let mockSocket: WebSocket;
  let sendMessageToSocket: (message: any) => void;

  beforeEach(() => {
    mockSocket = getWebSocket();
    const wrapper = new WebSocketWrapper(mockSocket);
    wsw = connectSocket(wrapper);
    sendMessageToSocket = getSendToSocketFn(mockSocket);
  });

  it("make a one time listener", () => {
    const messages: string[] = [];

    wsw.once(event, () => messages.push("hello!"));
    sendMessageToSocket({ event });
    sendMessageToSocket({ event });
    sendMessageToSocket({ event });
    expect(messages).toEqual(["hello!"]);
  });

  it("make a one time listener on channel", () => {
    const messages: string[] = [];

    wsw.of(channel).once(event, () => messages.push("hello!"));
    sendMessageToSocket({ event, channel });
    sendMessageToSocket({ event, channel });
    sendMessageToSocket({ event, channel });
    expect(messages).toEqual(["hello!"]);
  });

  it.skip("make a one time listener on a reserved event name", () => {});
});
