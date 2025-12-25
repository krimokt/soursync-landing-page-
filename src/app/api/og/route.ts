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

    // Generate dynamic OG image using ImageResponse
    return new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
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
          },
          children: {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1000px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 72,
                      marginBottom: 40,
                      textAlign: 'center',
                      lineHeight: 1.2,
                      background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                      backgroundClip: 'text',
                      color: 'transparent',
                    },
                    children: title,
                  },
                },
                ...(description
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 32,
                            color: '#9ca3af',
                            textAlign: 'center',
                            lineHeight: 1.4,
                            marginTop: 20,
                          },
                          children: description,
                        },
                      },
                    ]
                  : []),
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 24,
                      color: '#06b6d4',
                      marginTop: 60,
                      fontWeight: 600,
                    },
                    children: 'soursync.com',
                  },
                },
              ],
            },
          },
        },
      } as any,
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

