import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})


axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')

axios.post('/extend/post', {msg: 'post'})
axios.post('/extend/put', {msg: 'put'})
axios.post('/extend/patch', {msg: 'patch'})
