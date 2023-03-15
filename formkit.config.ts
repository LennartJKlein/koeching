import { DefaultConfigOptions } from '@formkit/vue'
import { nl } from '@formkit/i18n'
import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'
import genesis from '@formkit/themes/tailwindcss/genesis'

const config: DefaultConfigOptions = {
  locales: { nl },
  locale: 'nl',
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(genesis),
  },
}

export default config
