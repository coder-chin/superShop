export default {
  //context是上下文
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查看是否添加过
      const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.+1或者新添加
      if (oldInfo) {
        context.commit('addCounter', oldInfo)
        resolve('+1')
      } else {
        payload.count = 1
        payload.checked = true
        context.commit('addToCart', payload)
        resolve('+1')
      }
    })
    
  }
}