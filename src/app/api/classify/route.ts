import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const response = await fetch('https://email-classifier-backend-rxlb.onrender.com/api/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

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
        
        return NextResponse.json(data);

    } catch (error) {
        console.error('❌ Erro na API classify:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        const errorStack = error instanceof Error ? error.stack : 'Stack trace não disponível';
        
        console.error('❌ Stack trace:', errorStack);
        
        return NextResponse.json(
            { error: `Erro interno: ${errorMessage}` },
            { status: 500 }
        );
    }
}