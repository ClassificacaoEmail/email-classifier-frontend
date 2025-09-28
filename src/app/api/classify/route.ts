import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        console.log('📤 Redirecionando para backend Python:', `${BACKEND_URL}/api/classify`);
        console.log('📝 Dados enviados:', body);
        
        const response = await fetch(`${BACKEND_URL}/api/classify`, {
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
        
        // Se o backend Python não estiver disponível
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return NextResponse.json(
                { error: 'Backend Python não está disponível. Certifique-se que está rodando na porta 5000.' },
                { status: 503 }
            );
        }
        
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}