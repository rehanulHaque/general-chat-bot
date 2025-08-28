import { auth } from "@/auth";
import { client } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const body = await req.json();
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Find or create chat for this user (optionally use chatId from body)
        let chat;
        if (body.chatId) {
            chat = await prisma.chat.findUnique({ where: { id: body.chatId } });
        }
        if (!chat) {
            const chatTitle = await client.responses.create({
                model: "gpt-3.5-turbo",
                input:`Create a chat title of 3-4 words of this message: ${body.input}`
            })
            console.log(chatTitle.output_text)
            chat = await prisma.chat.create({
                data: {
                    userId: session.user.id,
                    title: chatTitle.output_text || "New Chat",
                },
            });
        }

        // Save user message
        const userMessage = await prisma.message.create({
            data: {
                sender: "user",
                content: body.input,
                chatId: chat.id,
            },
        });

        // Get bot response
        const botResponse = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: body.input },
            ],
        });
        const botReply = botResponse.choices[0].message?.content || "";

        // Save bot message
        const botMessage = await prisma.message.create({
            data: {
                sender: "assistant",
                content: botReply,
                chatId: chat.id,
            },
        });

        return NextResponse.json({ chatId: chat.id, userMessage, botMessage }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}