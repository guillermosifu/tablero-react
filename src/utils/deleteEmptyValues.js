export const deleteEmptyValues = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}