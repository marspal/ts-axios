import { getAjaxRequest } from './helper'
import axios from '../src'
describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should add a download progress handler', () => {
    const progressSpy = jest.fn()

    axios('/foo', {
      onDownloadProgress: progressSpy
    })
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })
})
