import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const userId = await auth()
        const previousChat = await prisma.chat.findMany({
            where: {
                userId: userId?.user?.id
            }
        })
        return NextResponse.json({data: previousChat}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}