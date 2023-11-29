export default class PingError extends Error {
  // eslint-disable-next-line no-useless-constructor
  constructor(message: string) {
    super(message)
  }
}
