const mutations = {
  addCart(state, info) {
    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.id === info.id)

    // 2.+1或者新添加
    if (oldInfo) {
      oldInfo.count++
    } else {
      info.count = 1
      info.checked = true
      state.cartList.push(info)
    }
  }
}

export default mutations

