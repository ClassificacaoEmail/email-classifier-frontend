import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        console.log('📤 Redirecionando para backend Python: https://email-classifier-backend-rxlb.onrender.com/api/classify');
        console.log('📝 Dados enviados:', body);
        
        const response = await fetch('https://email-classifier-backend-rxlb.onrender.com/api/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log('📥 Resposta do backend:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro do backend:', errorText);
            
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { error: 'Erro ao processar solicitação' };
            }
            
            return NextResponse.json(
                { error: errorData.error || 'Erro ao processar solicitação' },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('✅ Dados recebidos do Python:', data);
        
        return NextResponse.json(data);

    } catch (error) {
        console.error('❌ Erro na API:', error);
        
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}