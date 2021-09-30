

export function loggedAction(type, from, isShow = false) {
  if (isShow) console.log(`Incorrect dispatch action type! ${from}: \"${type}\".`);
}