const getters = {
  cartList(state) {
    return state.cartList
  },
  cartCount(state, getters) {
    return getters.cartList.length
  },
  selectShop(state) {
    let count = 0
    state.cartList.find(item => {
      if(item.count >= 0 && item.checked === true) {
        count = count + item.count
      }
    })
    return count
  }
}

export default getters
