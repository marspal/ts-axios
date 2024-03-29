import axios from '../../src/index'

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios
    .get<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.log(err))

  // return axios<ResponseData<T>>('/extend/user')
  //   .then(res => res.data)
  //   .catch(err => console.log(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hisss'
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

axios.post('/extend/post', { msg: 'post' })
axios.post('/extend/put', { msg: 'put' })
axios.post('/extend/patch', { msg: 'patch' })
