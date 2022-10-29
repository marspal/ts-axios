import Cancel, { isCancel } from '../../src/cancel/cancel'

describe('cancel:Cancel', () => {
  it('should returns correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })
  it('should returns true if value is a Cancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })
  it('should returns false if value is a not Cancel', () => {
    expect(isCancel({})).toBeFalsy()
  })
})
