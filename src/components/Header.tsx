import React from 'react';

const Header = () => {
    return (
        <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Classificação de Email</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Analise a produtividade dos seus emails e<br />
                receba sugestões de respostas inteligentes
            </p>
        </div>
    );
};

export default Header;