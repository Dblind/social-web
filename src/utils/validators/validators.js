export const required = (value) => {
  if (value) return undefined;

  return "Field is required"
}

export const maxLength =(maxLength) => value => {
  if (value?.length > maxLength) return `The muximum length must not exceed ${maxLength} characters`;
  else return undefined;
}

export const minLength = minLength => value => {
  const message = `The length must be more then ${minLength - 1} characters.`
  if (value?.length < minLength) { console.log(message); return message; }
  else {    return undefined;}
}