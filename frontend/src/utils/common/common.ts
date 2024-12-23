export const isAICoachPlaygroundRoute = (pathname: string) => {
  const regex = /\/ai-conversation-coach\/(.*)/;
  return regex.test(pathname);
};
