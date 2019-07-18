import rollbar from './rollbar';

export const error = (props: any) => {
  console.error(...props);
  rollbar.error(...props);
};

export const info = (props: any) => {
  console.log(...props);
  rollbar.info(...props);
};
