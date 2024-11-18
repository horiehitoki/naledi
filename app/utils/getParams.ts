export const getParams = (request: Request, name: string) => {
  const url = new URL(request.url);
  return url.searchParams.get(name) || "";
};
