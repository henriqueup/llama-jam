import { registerGlobalMiddleware } from "@tanstack/react-start";
import {
  errorHandlingMiddleware,
  loggingMiddleware,
} from "./server/middleware";

registerGlobalMiddleware({
  middleware: [loggingMiddleware, errorHandlingMiddleware],
});
