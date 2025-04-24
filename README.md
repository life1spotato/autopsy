# autopsy

## 프록시서버 직접 호스팅 방법
1. [Cloudflare 대시보드](https://dash.cloudflare.com/)
2. Workers 및 Pages
3. '생성' 선택
4. 'Hello world' 템플릿 선택
5. '배포' 선택
6. '코드 편집' 선택
7. 다음의 소스로 교체 후 배포, autopsy.js 스크립트의 URL 교체
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')

  if (targetUrl && (targetUrl.includes('.css') || 
                    targetUrl.includes('.woff') || 
                    targetUrl.includes('.woff2'))) {
    return new Response('Blocked resource type', {
      status: 403,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    })
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  if (!targetUrl) {
    return new Response('Missing URL parameter', { 
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  }

  try {
    const decodedUrl = decodeURIComponent(targetUrl)
    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
      }
    })

    const modifiedResponse = new Response(response.body, response)
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*')
    modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    
    return modifiedResponse
  } catch (error) {
    return new Response(error.message, { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  }
}
```
