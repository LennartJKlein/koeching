interface contentStylesComposable {
  classes: string[]
}

export const useContentStyles = (theme: string = 'dark'): contentStylesComposable => {
  return {
    classes: [
      '[&_h2]:mt-5 [&_h2]:mb-1 [&_h2+p]:mt-1 [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-2xl [&_h2]:leading-none',
      '[&_h3]:mt-5 [&_h3]:mb-1 [&_h3+p]:mt-1 [&_h3]:font-bold [&_h3]:font-display [&_h3]:text-2xl [&_h3]:leading-none',
      '[&_h4]:mt-5 [&_h4]:mb-1 [&_h4+p]:mt-1 [&_h4]:font-bold [&_h4]:font-display [&_h4]:text-2xl [&_h4]:leading-none',
      '[&_h5]:mt-5 [&_h5]:mb-1 [&_h5+p]:mt-1 [&_h5]:font-bold [&_h5]:font-display [&_h5]:text-2xl [&_h5]:leading-none',
      '[&_h6]:mt-5 [&_h6]:mb-1 [&_h6+p]:mt-1 [&_h6]:font-bold [&_h6]:font-display [&_h6]:text-2xl [&_h6]:leading-none',
      theme == 'light'
        ? '[&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white'
        : '',
      theme !== 'light'
        ? '[&_h2]:text-brown-400 [&_h3]:text-brown-400 [&_h4]:text-brown-400 [&_h5]:text-brown-400 [&_h6]:text-brown-400'
        : '',
      '[&_ul]:mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:leading-relaxed',
      '[&_ol]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:leading-relaxed',
      '[&>a]:underline [&_p>a]:underline [&_ul>li>a]:underline [&_ol>li>a]:underline [&_div>a]:underline',
      '[&_p]:mt-4 [&_p]:leading-relaxed',
      '[&_img]:w-full [&_img]:object-contain [&_img]:my-5',
      'first:[&>*]:mt-0 last:[&>*]:mb-0',
    ],
  }
}
