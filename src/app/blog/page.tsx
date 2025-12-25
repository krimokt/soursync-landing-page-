import { permanentRedirect } from 'next/navigation'

export default function BlogPage() {
  // Redirect to English blog by default
  permanentRedirect('/blog/en')
}

