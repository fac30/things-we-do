import type { MetadataRoute } from 'next';
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Things We Do',
    short_name: 'ThingsWeDo',
    description: 'A powerful app to manage your tasks efficiently.',
    start_url: '/', // The URL should be a path relative to your app’s domain.
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    categories: ['productivity', 'utilities'],
    scope: '/', // Add scope to define the navigation scope of the app.
    lang: 'en', // Add lang to specify the primary language of your app.
    icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    
  }
}