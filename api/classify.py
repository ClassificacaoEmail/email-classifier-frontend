from http.server import BaseHTTPRequestHandler
import json
import urllib.parse

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Ler dados
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            text = data.get('text', '').lower()
            
            if not text:
                self.send_error_response(400, 'Texto não fornecido')
                return
            
            # CLASSIFICAÇÃO SUPER SIMPLES E EFICAZ
            result = classify_simple(text)
            
            self.send_success_response(result)
            
        except Exception as e:
            self.send_error_response(500, f'Erro: {str(e)}')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_success_response(self, data):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = json.dumps(data)
        self.wfile.write(response.encode())
    
    def send_error_response(self, status, message):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = json.dumps({'error': message})
        self.wfile.write(response.encode())

def classify_simple(text):
    """Classificação simples mas eficaz"""
    
    # Contadores por categoria
    suporte_count = 0
    comercial_count = 0
    reuniao_count = 0
    financeiro_count = 0
    
    # SUPORTE TÉCNICO
    suporte_words = ['suporte', 'problema', 'erro', 'ajuda', 'técnico', 'falha', 'bug', 
                     'não funciona', 'não consigo', 'sistema', 'aplicação', 'conta', 
                     'login', 'acesso', 'solicitação', 'ticket', 'status', 'documentos']
    
    for word in suporte_words:
        if word in text:
            suporte_count += 1
    
    # EMAIL COMERCIAL
    comercial_words = ['comprar', 'venda', 'produto', 'preço', 'comercial', 'orçamento',
                       'interessado', 'adquirir', 'contratar', 'investir', 'negócio',
                       'proposta', 'catálogo', 'serviço', 'custo', 'valor', 'oferta']
    
    for word in comercial_words:
        if word in text:
            comercial_count += 1
    
    # REUNIÃO/AGENDAMENTO
    reuniao_words = ['reunião', 'meeting', 'agenda', 'encontro', 'agendar', 'marcar',
                     'conversar', 'discutir', 'apresentar', 'horário', 'disponível',
                     'calendário', 'zoom', 'teams', 'presencial']
    
    for word in reuniao_words:
        if word in text:
            reuniao_count += 1
    
    # FINANCEIRO
    financeiro_words = ['pagamento', 'boleto', 'fatura', 'cobrança', 'financeiro',
                        'pagar', 'débito', 'crédito', 'reembolso', 'vencimento',
                        'segunda via', 'parcela', 'juros', 'conta']
    
    for word in financeiro_words:
        if word in text:
            financeiro_count += 1
    
    # DETERMINAR CATEGORIA
    counts = {
        'Suporte Técnico': suporte_count,
        'Email Comercial': comercial_count,
        'Reunião/Agendamento': reuniao_count,
        'Financeiro': financeiro_count
    }
    
    max_count = max(counts.values())
    
    if max_count == 0:
        category = 'Email Geral'
        confidence = 60.0
    else:
        category = max(counts, key=counts.get)
        # Confiança baseada na proporção
        total_count = sum(counts.values())
        confidence = min(95.0, (max_count / total_count) * 100)
        confidence = max(70.0, confidence)
    
    # SUGESTÕES
    suggestions = get_suggestions(category)
    
    return {
        'classification': category,
        'confidence': round(confidence, 1),
        'suggestions': suggestions
    }

def get_suggestions(category):
    suggestions_map = {
        'Suporte Técnico': [
            "Recebemos sua solicitação de suporte técnico.",
            "Nossa equipe especializada analisará seu caso.",
            "Retornaremos com uma solução em até 24 horas.",
            "Ticket criado: #" + str(hash(category) % 9000 + 1000)
        ],
        'Email Comercial': [
            "Obrigado pelo interesse em nossos produtos/serviços.",
            "Preparamos uma proposta personalizada para você.",
            "Nossa equipe comercial entrará em contato em breve.",
            "Confira condições especiais em nosso site."
        ],
        'Reunião/Agendamento': [
            "Confirmo sua solicitação de reunião.",
            "Verificando disponibilidade na agenda...",
            "Prefere reunião presencial ou online?",
            "Enviarei convite após confirmação de horário."
        ],
        'Financeiro': [
            "Questão financeira direcionada ao setor responsável.",
            "Nossa equipe financeira retornará em até 48h.",
            "Mantenha documentos/comprovantes disponíveis.",
            "Qualquer dúvida, estamos à disposição."
        ],
        'Email Geral': [
            "Obrigado pelo seu contato conosco.",
            "Analisaremos sua mensagem cuidadosamente.",
            "Nossa equipe retornará em breve.",
            "Sua comunicação é importante para nós."
        ]
    }
    
    return suggestions_map.get(category, suggestions_map['Email Geral'])