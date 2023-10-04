import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffae00',
        header: '#3c3c3c',
        secondary: '#ffd478',
        secondary_contrast: '#393939',
        unselected: '#5f5f5f',
        unselected_contrast: '#ffffff',
        tag: '#79e5e0',
        tag_contrast: '#0c2191',
        trait: '#8fe596',
        trait_contrast: '#146a2d',
        note: '#f49dce',
        note_contrast: '#6a1463'
      }
    }
  },
  plugins: [],
}
export default config
