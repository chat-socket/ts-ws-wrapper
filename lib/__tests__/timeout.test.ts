/* tslint:disable:no-empty */

import {WebSocket} from "mock-socket";
import WebSocketWrapper from "../WebSocketWrapper";
import { connectSocket, createPayload, delay, getSendToSocketFn, getWebSocket } from "./utils";

describe("#timeout()", () => {
  const event = "event";
  const channel = "channel";
  const id = 1;
  let wsw: WebSocketWrapper;
  let mockSocket: WebSocket;
  let sendMessageToSocket: (message: any) => void;

  beforeEach(() => {
    mockSocket = getWebSocket();
    const wrapper = new WebSocketWrapper(mockSocket);
    wsw = connectSocket(wrapper);
    sendMessageToSocket = getSendToSocketFn(mockSocket);
  });

  it("receive resolve response before request times out", done => {
    wsw
      .timeout(3000)
      .request(event)
      .then(msg => {
        done();
      });

    sendMessageToSocket({ id });
  });

  it("request timed out", done => {
    jest.useFakeTimers();

    wsw
      .timeout(1000)
      .request(event)
      .catch(err => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual("Request timed out");
        done();
      });

    jest.runOnlyPendingTimers();
  });
});
