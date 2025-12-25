import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get('title') || 'SourSync Blog'
    const description = searchParams.get('description') || ''
    const image = searchParams.get('image')

    // If custom image provided, redirect to it
    if (image) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: image.startsWith('http') ? image : `https://soursync.com${image}`,
        },
      })
    }

    // Generate dynamic OG image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)',
            fontSize: 60,
            fontWeight: 700,
            color: '#ededed',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: 72,
                marginBottom: 40,
                textAlign: 'center',
                lineHeight: 1.2,
                background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: 32,
                  color: '#9ca3af',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  marginTop: 20,
                }}
              >
                {description}
              </div>
            )}
            <div
              style={{
                fontSize: 24,
                color: '#06b6d4',
                marginTop: 60,
                fontWeight: 600,
              }}
            >
              soursync.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

