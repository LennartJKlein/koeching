interface contentStylesComposable {
  classes: string[]
}

export const useContentStyles = (): contentStylesComposable => {
  return {
    classes: [
      'first:[&>h2]:mt-0 [&>h2]:mt-5 [&>h2]:mb-1 [&>h2+p]:mt-1 [&>h2]:font-bold [&>h2]:font-display [&>h2]:text-2xl [&>h2]:leading-none [&>h2]:text-brown-400',
      'first:[&>h3]:mt-0 [&>h3]:mt-5 [&>h3]:mb-1 [&>h3+p]:mt-1 [&>h3]:font-bold [&>h3]:font-display [&>h3]:text-2xl [&>h3]:leading-none [&>h3]:text-brown-400',
      'first:[&>h4]:mt-0 [&>h4]:mt-5 [&>h4]:mb-1 [&>h4+p]:mt-1 [&>h4]:font-bold [&>h4]:font-display [&>h4]:text-2xl [&>h4]:leading-none [&>h4]:text-brown-400',
      'first:[&>h5]:mt-0 [&>h5]:mt-5 [&>h5]:mb-1 [&>h5+p]:mt-1 [&>h5]:font-bold [&>h5]:font-display [&>h5]:text-2xl [&>h5]:leading-none [&>h5]:text-brown-400',
      'first:[&>h6]:mt-0 [&>h6]:mt-5 [&>h6]:mb-1 [&>h6+p]:mt-1 [&>h6]:font-bold [&>h6]:font-display [&>h6]:text-2xl [&>h6]:leading-none [&>h6]:text-brown-400',
      'first:[&>ul]:mt-0 [&>ul]:mt-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:leading-relaxed',
      'first:[&>ol]:mt-0 [&>ol]:mt-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:leading-relaxed',
      '[&>p>a]:underline [&>ul>li>a]:underline [&>ol>li>a]:underline',
      'first:[&>p]:mt-0 [&>p]:mt-4 [&>p]:leading-relaxed',
    ],
  }
}
