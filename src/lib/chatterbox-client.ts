import createClient from "openapi-fetch";
import { env } from "./env";
import { paths } from "@/types/chatterbox-api";

export const chatterBox = createClient<paths>({
  baseUrl: env.CHATTER_BOX_API_URL,
  headers: {
    "x-api-key": env.CHATTER_BOX_API_KEY,
  },
});
