import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves api/chat.js (the Groq-powered AI assistant) during `npm run dev`, so the chat works locally
 * without `vercel dev`. In production Vercel runs the same file as a serverless function.
 */
function devChatApi(env) {
  return {
    name: 'youpeak-dev-chat-api',
    apply: 'serve',
    configureServer(server) {
      for (const [key, value] of Object.entries(env)) process.env[key] ??= value

      server.middlewares.use('/api/chat', async (req, res) => {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        try {
          req.body = JSON.parse(Buffer.concat(chunks).toString() || 'null')
        } catch {
          req.body = null
        }
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (payload) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        }
        try {
          const { default: handler } = await server.ssrLoadModule('/api/chat.js')
          await handler(req, res)
        } catch (err) {
          server.config.logger.error(String(err?.stack ?? err))
          if (!res.writableEnded) res.status(500).json({ error: 'Server error.' })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => ({ plugins: [react(), devChatApi(loadEnv(mode, process.cwd(), ''))] }))
