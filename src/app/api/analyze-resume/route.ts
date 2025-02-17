/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import formidable from "formidable";
import pdf from "pdf-parse";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const pdfData = await pdf(buffer);
        const resumeText = pdfData.text;

        return NextResponse.json({ success: true, analysis: resumeText });
    } catch (error) {
        console.error("Error analyzing resume:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
