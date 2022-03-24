const info = (...parameters: unknown[]): void => {
  console.log(...parameters)
}

const error = (...parameters: unknown[]): void => {
  console.error(...parameters)
}

export default { error, info }
