"use client"

import { useState } from "react";
import axios from 'axios';

export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        setLoading(true);
        try {
            // Create form data
            const formData = new FormData();
            formData.append('file', file);

            // Send to our API endpoint
            // const response = await axios.post('/api/analyze-resume', formData);
            const response = await axios.post('/api/analyze-resume', formData);

            console.log('Response:', response.data);

            if (!response.data.success) {
                throw new Error('Failed to analyze resume');
            }

            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error('Error:', error);
            setAnalysis('Error analyzing resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-4 mt-40">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!file || loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
            </form>

            {analysis && (
                <div className="mt-6 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                    <div className="whitespace-pre-wrap">{analysis}</div>
                </div>
            )}
        </div>
    )
}