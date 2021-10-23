export type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) => {
  if (value) return undefined;

  return "Field is required"
}

export const maxLength =(maxLength: number): ValidatorType => (value: string) => {
  if (value?.length > maxLength) return `The muximum length must not exceed ${maxLength} characters`;
  else return undefined;
}

export const minLength = (minLength: number): ValidatorType => (value: string) => {
  const message = `The length must be more then ${minLength - 1} characters.`
  if (value?.length < minLength) { console.log(message); return message; }
  else {    return undefined;}
}