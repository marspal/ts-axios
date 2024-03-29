import Cancel from '../../src/cancel/cancel'
import CancelToken from '../../src/cancel/CancelToken'
import { Canceler } from '../../src/types'
describe('cancel:CancelToken', () => {
  describe('reason', () => {
    it('should returns a Cancel if cancellation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      // 运行时这个值存在, 这里需要加!
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })
    it('should has no side effect if call cancellation for multi times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })
    it('should returns undefined if cancellation has not been requested', () => {
      const token = new CancelToken(() => {
        // do nothing
      })
      expect(token.reason).toBeUndefined()
    })
  })
  describe('promise', () => {
    it('should returns a Promise that resolves when cancellation is requested', done => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(reason => {
        expect(reason.message).toBe('Operation has been canceled.')
        expect(reason).toEqual(expect.any(Cancel))
        done()
      })
      cancel!('Operation has been canceled.')
    })
  })
  describe('throwIfRequested', () => {
    it('should throws if cancellation has been requested', () => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw.')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + thrown + '.')
        }
        expect(thrown.message).toBe('Operation has been canceled.')
      }
    })
    it('should does not throw if cancellation has not been requested', () => {
      const token = new CancelToken(() => {
        // do nothing
      })
      token.throwIfRequested()
    })
  })
  describe('source', () => {
    it('should returns an object containing token and cancel function', () => {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Operation has been canceled.')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('Operation has been canceled.')
    })
  })
})
