'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import EmailUpload from '../components/EmailUpload';
import EmailInput from '../components/EmailInput';
import Results from '../components/Results';

interface AnalysisResult {
    classification?: string;
    confidence?: number;
    suggestions?: string[];
}

const HomePage = () => {
    const [emailText, setEmailText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [showResults, setShowResults] = useState(false);

    const handleAnalyze = async () => {
        if (!emailText.trim()) return;
        
        setIsAnalyzing(true);
        
        try {
            const response = await fetch('/api/classify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: emailText }),
            });

            if (!response.ok) {
                throw new Error('Erro ao analisar email');
            }

            const data = await response.json();
            setResult(data);
            setShowResults(true);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleUploadResult = (uploadResult: AnalysisResult) => {
        console.log('Resultado do upload recebido:', uploadResult);
        setResult(uploadResult);
        setShowResults(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto px-4 py-12">
                
                <Header />
                
                <StatsCards />
                
                <EmailUpload onResult={handleUploadResult} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <EmailInput 
                        emailText={emailText}
                        setEmailText={setEmailText}
                        onAnalyze={handleAnalyze}
                        isAnalyzing={isAnalyzing}
                    />
                    <Results 
                        showResults={showResults}
                        result={result}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;