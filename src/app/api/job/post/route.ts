/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        const job = await prisma.jobs.create({
            data: {
                title: body.title,
                description: body.description,
                location: body.location,
                salary: body.salary,
                type: body.type,
                experience: body.experience,
                requirements: body.requirements[0] ? body.requirements : undefined,
                company: body.company,
                userId: session.user.id,
            }
        });

        return NextResponse.json({
            success: true,
            message: "job posted",
            job: job
        });
    } catch (error) {
        // Create a safe error object
        const safeError = error instanceof Error ? error : new Error('Unknown error occurred');

        // Log the error safely
        console.error("Error posting job:", safeError.message);

        return NextResponse.json({
            error: "Internal Server Error",
            details: safeError.message
        }, { status: 500 });
    }
}