export function checkTypes<T extends object>(value: any, properties: string | string[] | object): value is T {
  if (typeof value !== 'object'){
    return false;
  }

  if (typeof properties === 'string') {
    return value[properties] !== undefined;
  } else {
    const keys = Array.isArray(properties) ? properties: Object.keys(properties);

    for (let i = 0, k = keys[i]; i < keys.length; i++, k = keys[i]) {
      if (typeof value[k] === 'undefined') {
        return false;
      }
    }
  }

  return true;
}
