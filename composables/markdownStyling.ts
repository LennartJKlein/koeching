
interface mdStylesComposable {
  classes: string[]
}

export const useMdStyles = (): mdStylesComposable => {
  return {
    classes:[
      '[&>h2]:mt-5 [&>h2]:mb-1 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:leading-none [&>h2]:text-brown-400',
      '[&>h3]:mt-5 [&>h3]:mb-1 [&>h3]:font-display [&>h3]:text-2xl [&>h3]:leading-none [&>h3]:text-brown-400',
      '[&>h4]:mt-5 [&>h4]:mb-1 [&>h4]:font-display [&>h4]:text-2xl [&>h4]:leading-none [&>h4]:text-brown-400',
      '[&>h5]:mt-5 [&>h5]:mb-1 [&>h5]:font-display [&>h5]:text-2xl [&>h5]:leading-none [&>h5]:text-brown-400',
      '[&>h6]:mt-5 [&>h6]:mb-1 [&>h6]:font-display [&>h6]:text-2xl [&>h6]:leading-none [&>h6]:text-brown-400',
      '[&>p]:mt-4 [&>p]:leading-relaxed',
      '[&>ul]:mt-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:leading-relaxed',
    ]
  }
}