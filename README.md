# Classificação de Emails

Este projeto é uma aplicação de classificação de emails, desenvolvida utilizando Next.js para o frontend e Python para o backend. A aplicação permite que os usuários façam upload de emails, que são então classificados e analisados, com sugestões de resposta geradas com base na classificação.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: `frontend` e `backend`.

### Frontend

O frontend é construído com Next.js e contém os seguintes arquivos:

- **src/app/page.tsx**: Página principal da aplicação.
- **src/app/layout.tsx**: Layout global da aplicação.
- **src/app/globals.css**: Estilos globais da aplicação.
- **src/components/EmailUpload.tsx**: Componente para upload de emails.
- **src/components/ResultDisplay.tsx**: Componente para exibir resultados da classificação.
- **src/components/ResponseSuggestion.tsx**: Componente para sugerir respostas.
- **src/lib/api.ts**: Funções para interagir com a API do backend.
- **src/types/index.ts**: Tipos TypeScript utilizados na aplicação.

### Backend

O backend é desenvolvido em Python e utiliza Flask. Os principais arquivos incluem:

- **src/main.py**: Ponto de entrada da aplicação backend.
- **src/api/routes.py**: Definição das rotas da API.
- **src/services/email_processor.py**: Processamento de emails recebidos.
- **src/services/classifier.py**: Lógica de classificação dos emails.
- **src/services/response_generator.py**: Geração de sugestões de resposta.
- **src/models/email_model.py**: Modelo de dados para os emails.
- **requirements.txt**: Dependências necessárias para o backend.
- **app.py**: Configuração e inicialização da aplicação Flask.

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

### Frontend

1. Navegue até o diretório `frontend`.
2. Instale as dependências com o comando:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento com:
   ```
   npm run dev
   ```

### Backend

1. Navegue até o diretório `backend`.
2. Crie um ambiente virtual e ative-o (opcional, mas recomendado).
3. Instale as dependências com o comando:
   ```
   pip install -r requirements.txt
   ```
4. Inicie o servidor Flask com:
   ```
   python app.py
   ```

## Uso

Após iniciar ambos os servidores, acesse a aplicação frontend em `http://localhost:3000`. Você poderá fazer upload de emails e visualizar os resultados da classificação e sugestões de resposta.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias e correções.