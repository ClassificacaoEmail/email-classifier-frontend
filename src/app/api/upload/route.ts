import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        
        const formData = await request.formData();
        
        const file = formData.get('file');
        if (!file) {
            return NextResponse.json(
                { error: 'Nenhum arquivo enviado' },
                { status: 400 }
            );
        }
        
        const response = await fetch('https://email-classifier-backend-rxlb.onrender.com/api/upload', {
            method: 'POST',
            body: formData,
        });


        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro do backend:', errorText);
            
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { error: 'Erro ao processar arquivo' };
            }
            
            return NextResponse.json(
                { error: errorData.error || 'Erro ao processar arquivo' },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        return NextResponse.json(data);

    } catch (error) {
        console.error('❌ Erro na API upload:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        const errorStack = error instanceof Error ? error.stack : 'Stack trace não disponível';
        
        console.error('❌ Stack trace:', errorStack);
        
        return NextResponse.json(
            { error: `Erro interno: ${errorMessage}` },
            { status: 500 }
        );
    }
}