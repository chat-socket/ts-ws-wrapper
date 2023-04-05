
const WS_WRAPPER_NAMESPACE = "ws-wrapper";

export default class Debug {
  public static log = (...data: any[]) => console.debug(data);
  public static error = (...data: any[]) => console.error(data);
}
