import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const colors = {}

const components = {
  Button: {
    sizes: {
      sm: {
        fontSize: '1rem',
        fontWeight: 400,
      },
      md: {
        fontSize: '1rem',
        fontWeight: 400,
      },
      lg: {
        fontSize: '1rem',
        fontWeight: 400,
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 500,
    },
  },
  Text: {
    baseStyle: {
      fontWeight: 300,
    },
  },
  Input: {
    baseStyle: {
      fontWeight: 300,
    },
  },
  MenuItem: {
    baseStyle: {
      fontWeight: 300
    }
  }
}

const font = {
  body: `Inter, Helvetica, sans-serif`,
  heading: `Inter, Helvetica, sans-serif`,
}

const overrides = {
  config,
  colors,
  components,
  font,
}

const theme = extendTheme(overrides)
export default theme
