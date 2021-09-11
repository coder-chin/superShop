export default {
  //context是上下文
  addCart(context, payload) {
    // 1.查看是否添加过
    const oldInfo = context.state.cartList.find(item => item.iid === info.iid)
    // 2.+1或者新添加
    if (oldInfo) {
      context.commit('addCounter', oldInfo)
    } else {
      payload.count = 1
      payload.checked = true
      context.commit('addToCart', payload)
    }
  }
}