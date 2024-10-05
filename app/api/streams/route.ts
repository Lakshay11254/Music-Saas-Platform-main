import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../lib/db";
import { url } from "inspector";
const YT_REGEX = new RegExp("https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+")

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
        const isYt = YT_REGEX.test(data.url);
        if (!isYt) {
            return NextResponse.json({
                mssgae: "Wrong URL",
                status: 411,
            })
        }
        const extractId = data.url.split("?v=")[1];
       await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId: extractId,
                type: "Youtube",
            }
        });
        console.log(data);
        return new Response("Hello World");
    } catch (error) {
        console.log(error);
        return new Response("Error");
    }

}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.streams.findMany({
            where: {
                userId: creatorId ?? "",
            },
    });

return NextResponse.json({streams});

}
