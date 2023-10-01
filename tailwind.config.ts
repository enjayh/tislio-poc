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
        secondary: '#5e00ff',
        tertiary: '#ff00a2',
        quaternary: '#a2ff00',
        primary_light: '#ffbe33'
      }
    }
  },
  plugins: [],
}
export default config
