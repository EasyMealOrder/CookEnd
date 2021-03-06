/**
 * 订餐系统的统一对外模块
 */

import axios from 'axios'

const apihost = 'http://193.112.24.51:8000'
const genstr = '1234567890abcdefghijklmnopqrstuvwxyz'

export default {
  genstr,
  apihost,
  getCookie (name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop().split(';').shift()
  },
  // 厨师用
  // 返回当前账号所有未完成的订单
  getAllToDoOrder (cb) {
    console.log('getAllToDoOrder called')

    axios.get('/api/order/unfinished/')
      .then(cb)
      .catch(error => {
        console.log(error)
      })
  },

  // 厨师用
  // 点击完成某个订单中某个菜品时执行
  finishADishInAOrder: function (orderId, dishId, cb, errorCb) {
    const loginUrL = '/api/dishrecord/finish/'

    let params = new URLSearchParams()
    params.append('orderID', orderId)
    params.append('dishID', dishId)
    axios.post(loginUrL, params, {headers: {'X-CSRFToken': this.getCookie('csrftoken')}})
      .then(response => {
        console.log(response)
        cb()
      })
      .catch(error => {
        console.log(error)
        errorCb()
      })
  },

  // 厨师用
  // 点击某个订单的“全部完成”按钮时执行
  finishAOrder: function (orderId, cb, errorCb) {
    const loginUrL = '/api/order/finish/'

    let params = new URLSearchParams()
    params.append('orderID', orderId)
    axios.post(loginUrL, params, {headers: {'X-CSRFToken': this.getCookie('csrftoken')}})
      .then(response => {
        console.log(response)
        cb()
      })
      .catch(error => {
        console.log(error)
        errorCb()
      })
  }
}
