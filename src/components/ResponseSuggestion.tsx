import React from 'react';

interface ResponseSuggestionProps {
    suggestions?: string[];
}

const ResponseSuggestion: React.FC<ResponseSuggestionProps> = ({ 
    suggestions = ["Nenhuma sugestão disponível"] 
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sugestões de Resposta</h2>
            <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded border hover:bg-gray-100">
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResponseSuggestion;