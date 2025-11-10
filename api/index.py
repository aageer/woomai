# Vercel Serverless Function wrapper for Flask app
import sys
import os

# Add PromptEngineering to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'PromptEngineering'))

# Import Flask app
from app import app

# Vercel serverless handler
def handler(request):
    """
    Vercel serverless function handler
    Converts Vercel request to WSGI and back
    """
    from io import BytesIO
    
    # Extract method and path
    method = request.method
    path = request.path
    headers = dict(request.headers)
    body = request.body if hasattr(request, 'body') else b''
    
    # Create WSGI environment
    environ = {
        'REQUEST_METHOD': method,
        'PATH_INFO': path,
        'SCRIPT_NAME': '',
        'QUERY_STRING': request.query_string.decode() if hasattr(request, 'query_string') else '',
        'CONTENT_TYPE': headers.get('Content-Type', ''),
        'CONTENT_LENGTH': str(len(body)),
        'SERVER_NAME': 'localhost',
        'SERVER_PORT': '5000',
        'wsgi.version': (1, 0),
        'wsgi.url_scheme': 'https',
        'wsgi.input': BytesIO(body),
        'wsgi.errors': sys.stderr,
        'wsgi.multithread': False,
        'wsgi.multiprocess': True,
        'wsgi.run_once': False,
    }
    
    # Add headers to environ
    for key, value in headers.items():
        key = key.upper().replace('-', '_')
        if key not in ('CONTENT_TYPE', 'CONTENT_LENGTH'):
            environ[f'HTTP_{key}'] = value
    
    # WSGI response
    response_body = []
    
    def start_response(status, response_headers):
        response_body.append((status, response_headers))
    
    # Call Flask app
    result = app(environ, start_response)
    
    # Extract response
    status, headers = response_body[0]
    status_code = int(status.split()[0])
    
    # Convert headers to dict
    response_headers = dict(headers)
    
    # Get body
    body_content = b''.join(result) if isinstance(result, (list, tuple)) else b''.join([r.encode() if isinstance(r, str) else r for r in result])
    
    return {
        'statusCode': status_code,
        'headers': response_headers,
        'body': body_content.decode('utf-8') if isinstance(body_content, bytes) else body_content
    }
