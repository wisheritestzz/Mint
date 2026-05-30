import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署时设为 '/repo-name/'，本地开发用 '/'
const base = process.env.GITHUB_PAGES === 'true' ? '/mbti-qtest/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
