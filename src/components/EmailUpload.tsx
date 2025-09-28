'use client';

import React, { useState, useRef } from 'react';

interface EmailUploadProps {
    onResult?: (result: any) => void;
    onClear?: () => void;
}

const EmailUpload: React.FC<EmailUploadProps> = ({ onResult, onClear }) => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null); // Adicionar ref

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const maxSize = 10 * 1024 * 1024; // 10MB
            const allowedTypes = ['.txt', '.eml', '.msg', '.pdf'];
            
            if (selectedFile.size > maxSize) {
                setMessage('Arquivo muito grande. Máximo 10MB.');
                return;
            }
            
            const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
            if (!allowedTypes.some(type => fileExtension.includes(type.replace('.', '')))) {
                setMessage('Tipo de arquivo não suportado.');
                return;
            }
            
            setFile(selectedFile);
            setMessage('');
            console.log('Arquivo selecionado:', selectedFile.name);
        }
    };


    const resetComponent = () => {
        setFile(null);
        setMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        if (onClear) {
            onClear();
        }
    };

    const handleUpload = async () => {
        console.log('handleUpload chamado, arquivo:', file);
        
        if (!file) {
            setMessage('Por favor, selecione um arquivo para upload.');
            return;
        }

        setIsUploading(true);
        setMessage('Processando arquivo...');
        
        try {
            const formData = new FormData();
            formData.append('file', file);

            console.log('Enviando para /api/upload...');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            console.log('Resposta recebida:', response.status);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Resultado:', result);
            
            setMessage('Upload realizado com sucesso!');
            

            if (onResult) {
                onResult(result);
            }


        } catch (error) {
            console.error('Erro no upload:', error);
            setMessage('Erro ao processar arquivo. Tente novamente.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload de Email</h2>
            
            <div className="mb-4">
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    Selecione um arquivo de email:
                </label>
                <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept=".eml,.txt,.msg"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {file && (
                <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded mb-4">
                    📎 Arquivo selecionado: {file.name}
                </p>
            )}

            <div className="flex gap-2">
                <button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                >
                    {isUploading ? '⏳ Enviando...' : '📤 Enviar Email'}
                </button>

                {(file || message) && !isUploading && (
                    <button
                        onClick={resetComponent}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        🔄 Limpar
                    </button>
                )}
            </div>

            {message && (
                <div className={`mt-4 p-3 rounded ${
                    message.includes('sucesso') 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : message.includes('Processando')
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default EmailUpload;