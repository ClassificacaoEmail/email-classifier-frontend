import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        console.log('🔄 Iniciando upload...');
        
        const formData = await request.formData();
        console.log('📋 FormData recebido');
        
        // Verificar se arquivo existe
        const file = formData.get('file');
        if (!file) {
            console.log('❌ Nenhum arquivo no FormData');
            return NextResponse.json(
                { error: 'Nenhum arquivo enviado' },
                { status: 400 }
            );
        }
        
        console.log('📁 Arquivo detectado:', file instanceof File ? file.name : 'unknown');
        console.log('📤 Redirecionando upload para backend Python: https://email-classifier-backend-rxlb.onrender.com/api/upload');
        
        const response = await fetch('https://email-classifier-backend-rxlb.onrender.com/api/upload', {
            method: 'POST',
            body: formData,
        });

        console.log('📥 Resposta do upload:', response.status, response.statusText);

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
        console.log('✅ Upload processado:', data);
        
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