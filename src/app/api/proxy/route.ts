import { NextResponse } from 'next/server';

function getApiBaseUrl(): string {
  const requestUrl = typeof window !== 'undefined' ? window.location.origin : '';
  if (requestUrl.includes('localhost')) {
    return 'http://localhost:3001/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || 'http://localhost:3001/api';
}

const API_BASE_URL = getApiBaseUrl();

console.log('[API Proxy] Using backend URL:', API_BASE_URL);

async function proxyRequest(request: Request, method: string = 'GET') {
  const url = new URL(request.url);
  const path = url.searchParams.get('path') || 'products';
  const authHeader = request.headers.get('authorization');
  const fullUrl = `${API_BASE_URL}/${path}`;
  
  console.log(`[API Proxy] ${method} ${fullUrl}`);
  
  const contentType = request.headers.get('content-type') || '';
  
  try {
    const headers: Record<string, string> = {};
    
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    let body;
    
    if (contentType.includes('multipart/form-data')) {
      const arrayBuffer = await request.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      headers['Content-Type'] = contentType;
      body = buffer;
    } else {
      const jsonBody = await request.json().catch(() => ({}));
      if (method !== 'GET' && Object.keys(jsonBody).length > 0) {
        body = JSON.stringify(jsonBody);
        headers['Content-Type'] = 'application/json';
      }
    }
    
    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });
    
    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[API Proxy] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to connect to backend',
      details: error instanceof Error ? error.message : 'Unknown error',
      backendUrl: API_BASE_URL
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return proxyRequest(request, 'GET');
}

export async function POST(request: Request) {
  return proxyRequest(request, 'POST');
}

export async function PATCH(request: Request) {
  return proxyRequest(request, 'PATCH');
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path') || 'products';
  const authHeader = request.headers.get('authorization');
  const fullUrl = `${API_BASE_URL}/${path}`;
  
  console.log(`[API Proxy] DELETE ${fullUrl}`);
  
  try {
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { 'Authorization': authHeader } : {}),
      },
    });
    
    return new NextResponse(null, { status: response.status });
  } catch (error) {
    console.error('[API Proxy] Error:', error);
    return NextResponse.json({ error: 'Failed to connect to backend' }, { status: 500 });
  }
}