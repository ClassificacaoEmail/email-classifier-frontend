import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        console.log('📤 Redirecionando upload para backend Python:', `${BACKEND_URL}/api/upload`);
        
        const response = await fetch(`${BACKEND_URL}/api/upload`, {
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