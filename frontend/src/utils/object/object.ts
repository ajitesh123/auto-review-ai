export const isObject = (data: unknown) => !!(data && typeof data === 'object');

export const isObjectAndNotBlank = (data: unknown) =>
  data && typeof data === 'object' && Object.keys(data).length !== 0;

export const isBlankObject = (data: unknown) =>
  data && typeof data === 'object' && Object.keys(data).length == 0;

export const hasOwnProperty = (data: unknown, property: string) =>
  isObject(data) && Object.prototype.hasOwnProperty.call(data, property);

export const isEmptyArray = (array: unknown) =>
  Array.isArray(array) && array.length === 0;
