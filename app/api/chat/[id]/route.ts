import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }){
    try {
        const session = await auth()
        const {id} = (await params)
        if(!session?.user?.id){
            return NextResponse.json({message: "unauthorize"}, {status: 401})
        }

        const chatMessage = await prisma.chat.findFirst({
            where: {
                id
            },
            include: {
                messages: true
            }
        })
        return NextResponse.json({data: chatMessage}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}

export async function DELETE(req :NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth()
        const {id} = (await params)
        if(!session?.user?.id){
            return NextResponse.json({message: "unauthorize"}, {status: 401})
        }
        await prisma.chat.delete({
            where: {
                id
            }, include: {
                messages: true
            }
        })
        return NextResponse.json({message: "Chat deleted"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}