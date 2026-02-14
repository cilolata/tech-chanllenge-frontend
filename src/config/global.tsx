import { defineConfig } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const config = defineConfig({
  globalCss: {
    'html, body, #root': {
      minHeight: '100vh',
      width: '100%',
      bg: 'bg',
      backgroundSize: 'cover',
      fontSize: 'sm',
      color: 'text',
      transition: 'background 0.2s ease, color 0.2s ease',
    },

    'html.small-text': {
      fontSize: 'sm',
    },

    'html.medium-text': {
      fontSize: 'md',
    },

    'html.large-text': {
      fontSize: 'lg',
    },

    'body.manual-contrast': {
      '--chakra-colors-bg': '#000',
      '--chakra-colors-text': '#fff',
    },
  },
  theme: {
    tokens: {
      colors: {
        gray1: { value: '#333333' },
        gray2: { value: '#4F4F4F' },
        gray3: { value: '#828282' },
        gray4: { value: '#BDBDBD' },
        gray5: { value: '#E0E0E0' },
        gray6: { value: '#F2F2F2' },
        green1: { value: '#219653' },
        green2: { value: '#27AE60' },
        green3: { value: '#6FCF97' },
        pink: { value: '#E8DEF8' },
      },
      fontSizes: {
        sm: { value: '1rem' },
        md: { value: '1.125rem' },
        lg: { value: '1.25rem' },
      },
      lineHeights: {
        normal: { value: '1.5' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            _light: '#fff',
            _dark: '#000',
          },
        },
        text: {
          value: {
            _light: '#000',
            _dark: '#fff',
          },
        },
      },
    },
  },
})

export const Font = () => (
  <Global
    styles={`
      @font-face {
      font-family: "Source Sans 3", sans-serif;    
      src: url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
      font-weight: normal;
      font-style: normal;
      }

      a {
        cursor: pointer
      }
    `}
  />
)
