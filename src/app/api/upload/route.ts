import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        console.log('📤 Redirecionando upload para backend Python: https://email-classifier-backend-rxlb.onrender.com/api/upload');
        
        const response = await fetch('https://email-classifier-backend-rxlb.onrender.com/api/upload', {
            method: 'POST',
            body: formData,
        });

        console.log('📥 Resposta do upload:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.error || 'Erro ao processar arquivo' },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('✅ Upload processado:', data);
        
        return NextResponse.json(data);

    } catch (error) {
        console.error('❌ Erro no upload:', error);
        return NextResponse.json(
            { error: 'Erro ao processar arquivo ou backend indisponível' },
            { status: 500 }
        );
    }
}