import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { Font, config } from '@/global/global.tsx'
import './global/global.css'
import { RoutingManager } from '@/routes/index.tsx'
import { AuthProvider } from './contexts/auth-context'

export const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ChakraProvider value={system}>
        <Font />
        <RoutingManager />
      </ChakraProvider>
    </AuthProvider>
  </StrictMode>
)
