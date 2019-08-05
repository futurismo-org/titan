export const wrapShowS = (x: string) => x || '';
export const wrapShowN = (x: string) => x || 0;

export const sleep = (waitSeconds: number, func: any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(func());
    }, waitSeconds * 1000);
  });
};
