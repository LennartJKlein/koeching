import md from "markdown-it";

export default defineNuxtPlugin(() => {
  const renderer = md('default',{
    runtime: true,
    linkify: true,
    breaks: true,
  } as any);
  return {
    provide: {
      markdown: renderer,
    },
  };
});