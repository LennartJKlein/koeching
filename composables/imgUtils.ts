interface imgUtilsComposable {
  trimImgSrc: Function
}


export const useImgUtils = (): imgUtilsComposable => {
  return {
    trimImgSrc: (src: string) => src && src.substring(src.indexOf('/upload/') + 8)
  }
}