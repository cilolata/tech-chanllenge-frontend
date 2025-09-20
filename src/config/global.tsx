import { defineConfig } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const config = defineConfig({
  globalCss: {
    'html, body, #root': {
      height: '100vh',
      width: '100%',
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
        sm: { value: '12px' },
        md: { value: '16px' },
        lg: { value: '20px' },
        xl: { value: '24px' },
      },
      lineHeights: {
        normal: { value: '1.5' },
      },
    },
  },
})

export const Font = () => (
  <Global
    styles={`
      @font-face {
      font-family: "Source Sans 3", sans-serif;    
      src: url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
      font-weight: normal;
      font-style: normal;
      }

      a {
        cursor: pointer
      }
    `}
  />
)
