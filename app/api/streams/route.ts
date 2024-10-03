import { NextRequest } from "next/server";
import {z} from "zod";

const createStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string(),
    // type: z.string(),
    // title: z.string(),
    // smallImg: z.string(),
    // bigImg: z.string(),
})
export async function POST(req: NextRequest) {
    // const  data = await req.json();

    try {
        const data = createStreamSchema.parse(await req.json());
        console.log(data);
        return new Response("Hello World");
      } catch (error) {
        console.log(error);
        return new Response("Error");
      }
}
 