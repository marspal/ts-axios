import axios from '../../src/index'
import { AxiosError } from '../../src/helpers/error'

// axios({
//   method: 'get',
//   url: '/error/get1'
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e, 'AAA')
//   })

// axios({
//   method: 'get',
//   url: '/error/get'
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })

// network-error
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   })
//     .then(res => {
//       console.log(res)
//     })
//     .catch(e => {
//       console.log(e)
//     })
// }, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.code)
    console.log(e.config)
    console.log(e.request)
    console.log(e.isAxiosError)
  })
