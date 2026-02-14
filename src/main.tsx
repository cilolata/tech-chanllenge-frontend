import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { Font, config } from '@/config/global'
import { RoutingManager } from '@/routes/index.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { AccessibilityProvider } from './contexts/Accessibility'

export const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessibilityProvider>
      <AuthProvider>
        <ChakraProvider value={system}>
          <Font />
          <RoutingManager />
        </ChakraProvider>
      </AuthProvider>
    </AccessibilityProvider>
  </StrictMode>
)
