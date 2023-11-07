export default defineEventHandler(async event => {
  return getHeaders(event);
});
