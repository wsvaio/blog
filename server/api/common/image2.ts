export default defineEventHandler(async () => {
  // https://unsplash.it/1600/900?random
  // content: `https://picsum.photos/580/300?key=${Math.random()}`,
  return {
    content: `https://unsplash.it/400/300?random?key=${Math.random()}`,
  };
});
