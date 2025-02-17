/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import formidable from 'formidable';
import pdf from 'pdf-parse';
import fs from 'fs';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Parse the incoming form data
        const form = formidable();
        const [fields, files] = await form.parse(req);

        if (!files.file?.[0]) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read the PDF file
        const pdfFile = files.file[0];
        const buffer = fs.readFileSync(pdfFile.filepath);

        // Extract text from PDF
        const pdfData = await pdf(buffer);
        const resumeText = pdfData.text;
        console.log(resumeText);

        // Initialize Gemini model
        //     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        //     // Analyze the resume
        //     const prompt = `Analyze this resume and provide:
        // 1. Areas for improvement
        // 2. Recommended job roles based on the experience
        // 3. Specific suggestions to enhance the resume

        // Resume content:
        // ${resumeText}`;

        //     const result = await model.generateContent(prompt);
        //     const response = await result.response;
        //     const analysis = response.text();

        //     // Clean up the temporary file
        //     fs.unlinkSync(pdfFile.filepath);

        return res.status(200).json({ success: true, analysis: resumeText });
    } catch (error) {
        console.error('Error analyzing resume:', error);
        return res.status(500).json({ message: 'Error analyzing resume' });
    }
}
