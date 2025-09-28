import React from 'react';

interface EmailInputProps {
    emailText: string;
    setEmailText: (text: string) => void;
    onAnalyze: () => void;
    isAnalyzing: boolean;
    onClear?: () => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ 
    emailText, 
    setEmailText, 
    onAnalyze, 
    isAnalyzing,
    onClear 
}) => {
    const handleClear = () => {
        setEmailText('');
        if (onClear) {
            onClear();
        }
    };


    const LoadingSpinner = () => (
        <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span>Analisando...</span>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
                <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-900">Inserir Email (Texto)</h2>
                </div>
                <p className="text-sm text-gray-600">
                    Cole o texto do email diretamente aqui
                </p>
            </div>

            <div className="space-y-4">
                <textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="Cole o conteúdo do email aqui..."
                    rows={8}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />

                <div className="flex gap-2">
                    <button
                        onClick={onAnalyze}
                        disabled={!emailText.trim() || isAnalyzing}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                    >
                        {isAnalyzing ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Analisar Email
                            </>
                        )}
                    </button>

                    {emailText.trim() && !isAnalyzing && (
                        <button
                            onClick={handleClear}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                        >
                            🔄 Limpar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailInput;