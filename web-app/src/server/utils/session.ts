import { getHeader, setHeader } from "@tanstack/react-start/server";
import { parse } from "cookie-es";
import { SessionService } from "../services/SessionService";

export async function createSession(userId: string) {
  const sessionService = new SessionService();
  const session = await sessionService.createSession(userId);

  setHeader("Set-Cookie", `session_id=${session.id}; HttpOnly; Path=/;`);
}

export function parseSession() {
  const cookies = parse(getHeader("Cookie") ?? "");
  return cookies.session_id;
}

export function deleteSession() {
  setHeader(
    "Set-Cookie",
    `session_id=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
}
