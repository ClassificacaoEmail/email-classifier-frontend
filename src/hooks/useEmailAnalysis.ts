import { useState, useCallback } from 'react';

export const useEmailAnalysis = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState<string>('');

    const analyzeEmail = useCallback(async (data: string | FormData, type: 'text' | 'file') => {
        setIsLoading(true);
        setError('');
        
        try {
            const endpoint = type === 'file' ? '/api/upload' : '/api/analyze';
            
            const fetchOptions: RequestInit = {
                method: 'POST',
                body: type === 'file' ? data : JSON.stringify({ emailText: data }),
            };

            if (type === 'text') {
                fetchOptions.headers = {
                    'Content-Type': 'application/json'
                };
            }
            
            const response = await fetch(endpoint, fetchOptions);

            if (!response.ok) throw new Error(`Erro ${response.status}`);
            
            const result = await response.json();
            setResult(result);
            return result;
        } catch (err) {
            const errorMsg = 'Erro ao processar. Tente novamente.';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearResults = useCallback(() => {
        setResult(null);
        setError('');
    }, []);

    return { analyzeEmail, isLoading, result, error, clearResults };
};
