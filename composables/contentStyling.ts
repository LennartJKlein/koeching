interface contentStylesComposable {
  classes: string[]
}

export const useContentStyles = (theme?: string = 'dark'): contentStylesComposable => {
  return {
    classes: [
      'first:[&_h2]:mt-0 [&_h2]:mt-5 [&_h2]:mb-1 [&_h2+p]:mt-1 [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-2xl [&_h2]:leading-none',
      'first:[&_h3]:mt-0 [&_h3]:mt-5 [&_h3]:mb-1 [&_h3+p]:mt-1 [&_h3]:font-bold [&_h3]:font-display [&_h3]:text-2xl [&_h3]:leading-none',
      'first:[&_h4]:mt-0 [&_h4]:mt-5 [&_h4]:mb-1 [&_h4+p]:mt-1 [&_h4]:font-bold [&_h4]:font-display [&_h4]:text-2xl [&_h4]:leading-none',
      'first:[&_h5]:mt-0 [&_h5]:mt-5 [&_h5]:mb-1 [&_h5+p]:mt-1 [&_h5]:font-bold [&_h5]:font-display [&_h5]:text-2xl [&_h5]:leading-none',
      'first:[&_h6]:mt-0 [&_h6]:mt-5 [&_h6]:mb-1 [&_h6+p]:mt-1 [&_h6]:font-bold [&_h6]:font-display [&_h6]:text-2xl [&_h6]:leading-none',
      theme == 'light' &&
        '[&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white',
      theme !== 'light' &&
        '[&_h2]:text-brown-400 [&_h3]:text-brown-400 [&_h4]:text-brown-400 [&_h5]:text-brown-400 [&_h6]:text-brown-400',
      'first:[&_ul]:mt-0 [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:leading-relaxed',
      'first:[&_ol]:mt-0 [&_ol]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:leading-relaxed',
      '[&_p>a]:underline [&_ul>li>a]:underline [&_ol>li>a]:underline',
      'first:[&_p]:mt-0 [&_p]:mt-4 [&_p]:leading-relaxed',
    ],
  }
}
