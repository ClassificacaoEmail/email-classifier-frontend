import React from 'react';

interface ResultDisplayProps {
    classificationResult?: string;
    confidenceScore?: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
    classificationResult = "Não classificado", 
    confidenceScore = 0 
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Resultado da Classificação</h2>
            <div className="space-y-2">
                <p className="text-gray-700">
                    <span className="font-semibold">Classificação:</span> {classificationResult}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Confiança:</span> {confidenceScore.toFixed(2)}%
                </p>
            </div>
        </div>
    );
};

export default ResultDisplay;