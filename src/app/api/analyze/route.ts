/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import formidable from 'formidable';
import pdf from 'pdf-parse';
import fs from 'fs';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
    try {
        // Parse the incoming form data
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Extract text from PDF
        const pdfData = await pdf(buffer);
        const resumeText = pdfData.text;
        console.log(resumeText);

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Analyze the resume
        const prompt = `Analyze this resume and provide:
        1. Areas for improvement
        2. Recommended job roles based on the experience
        3. Specific suggestions to enhance the resume

        Resume content:
        ${resumeText}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysis = response.text();

        // Clean up the temporary file
        fs.unlinkSync(file.name);

        return NextResponse.json({ success: true, analysis: analysis });
    } catch (error) {
        console.error('Error analyzing resume:', error);
        return NextResponse.json({ message: 'Error analyzing resume' }, { status: 500 });
    }
}
