export const isDebugMode = () => {
  return process.env.DEBUG !== undefined;
};

export const debug = (...args: unknown[]) => {
  if (isDebugMode()) {
    console.log(...args);
  }
};
