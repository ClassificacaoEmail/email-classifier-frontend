import React from 'react';

interface AnalysisResult {
    classification?: string;
    confidence?: number;
    suggestions?: string[];
}

interface ResultsProps {
    showResults: boolean;
    result: AnalysisResult | null;
}

const Results: React.FC<ResultsProps> = ({ showResults, result }) => {
    if (!showResults || !result) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26c.3.16.65.16.95 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Aguardando análise</h3>
                    <p className="text-gray-600">Insira um email para ver os resultados aqui</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Resultados da Análise</h3>
                
                {/* Classification Result */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-blue-900">Classificação</span>
                    </div>
                    <p className="text-blue-800 font-semibold">{result.classification}</p>
                    <p className="text-sm text-blue-600">Confiança: {result.confidence?.toFixed(1)}%</p>
                </div>

                {/* Suggestions */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Sugestões de Resposta</h4>
                    <div className="space-y-3">
                        {result.suggestions?.map((suggestion, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition duration-200">
                                <p className="text-gray-700 text-sm">{suggestion}</p>
                                <button 
                                    onClick={() => navigator.clipboard.writeText(suggestion)}
                                    className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Copiar resposta
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;