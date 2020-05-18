/* eslint-disable implicit-arrow-linebreak */
export const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const initToUpper = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);
// export const serverHttp = 'http://61.75.4.217:8081';
export const serverHttp =
  'http://ec2-3-34-5-25.ap-northeast-2.compute.amazonaws.com:8081';
