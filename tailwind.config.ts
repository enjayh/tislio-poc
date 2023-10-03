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
        header: '#703611',
        secondary: '#ffd478',
        secondary_contrast: '#393939',
        unselected: '#393939',
        unselected_contrast: '#ffffff',
        tag: '#79e5e0',
        tag_contrast: '#0c2191',
        trait: '#79e582',
        trait_contrast: '#146a2d',
        note: '#e579b6',
        note_contrast: '#6a1463'
      }
    }
  },
  plugins: [],
}
export default config
