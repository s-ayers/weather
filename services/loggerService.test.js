const loggerService = require('./loggerService')

describe('loggerService', () => {
  it('should export a logger function', () => {
    expect(typeof loggerService.logger).toBe('function')
  })

  // You can write more tests here to cover different scenarios
})
