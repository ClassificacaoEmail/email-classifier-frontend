export const FILE_CONFIG = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['.txt', '.eml', '.msg', '.pdf'],
    ALLOWED_MIME_TYPES: ['text/plain', 'application/pdf', 'message/rfc822']
};

export const API_ENDPOINTS = {
    UPLOAD: '/api/upload',
    ANALYZE: '/api/analyze'
};