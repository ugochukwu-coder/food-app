import { menuArray } from "./data.js"

const renderMenu = document.getElementById('main__menu')
const orderEl = document.getElementById('order')
const totalPriceEl = document.getElementById('total__price')
const completeOrderEl = document.getElementById('complete__order')
const totalOrder = document.getElementById('total__order')
const successMsg =  document.querySelector('.success__sms')

let orderArray = []
let totalPrice = 0

document.addEventListener('click', (e) => {
  if(e.target.dataset.id){
    handleAddClick(e.target.dataset.id)
  }
  else if (e.target.dataset.remove){
    removeItemWhenClick(e.target.dataset.remove)
  }
  else if (e.target.id === 'btn__order') {
    completeOrder()
  }

  else if (e.target.id === 'close__modal-btn'){
    modal.style.display = 'none'
  }

  else if (e.target.id === 'submit-btn'){
    e.preventDefault()
    makePayment()
  }
})


function handleAddClick(itemId){
  let targetObject = menuArray.find((item) => item.id == itemId)

  if(!orderArray.includes(targetObject)){
    orderArray.push(targetObject)
    targetObject.quantity = 1
  }else{
    targetObject.quantity++
  }
  
  totalPrice += targetObject.price
  totalPriceEl.textContent = `$${totalPrice}`

  if(orderArray.length > 0) {
    orderEl.classList.remove('hidden')
    totalPriceEl.classList.remove('hidden')
    completeOrderEl.classList.remove('hidden')
    totalOrder.classList.remove('hidden')
  }
    render()
}


// remove item from the cart
function removeItemWhenClick(itemId){
  let targetObject = menuArray.find((item) => item.id == itemId)

  if (targetObject.quantity > 1) {
    targetObject.quantity--
}
else {
    orderArray = orderArray.filter(item => item.id != itemId)
}

totalPrice -= targetObject.price
totalPriceEl.textContent = `$${totalPrice}`

if (orderArray.length < 1) {
  orderEl.classList.add('hidden')
  totalPriceEl.classList.add('hidden')
  completeOrderEl.classList.remove('hidden')
  totalOrder.classList.add('hidden')
}

render()
}

// Render menus available on thhe dom
  
const menu = menuArray.map((data) => {
  return `
        <section class="component">
          <div class="product__container">
              <p class="emoji">${data.emoji}</p>

              <div class="product">
                  <h2 class="product__title">${data.name}</h2>
                  <p class="product__content">${data.ingredients}</p>
                  <p class="product__price">$${data.price}</p>
              </div>
          </div>

          <button class="btn" id="item-add"  data-id="${data.id}">+</button>
       </section>  
  `
}).join('')


// This show your order when you have selected the item to buy
function showCartItem(){
  let orderHtml = ` <p>Your Order</p>`

  orderArray.forEach((item) => {
    orderHtml += `
       <p class="order__paragraph">
          ${item.name}
          <span class="order-emoji">${item.emoji}</span>
          <span>X</span>
          <span>${item.quantity}</span>
          <button class="remove" id="remove" data-remove="${item.id}">remove</button>
          <span>$${item.price * item.quantity}</span>
        </p>
       
    `
  })
  return orderHtml
}

function completeOrder(){
  modal.style.display = "block"
}


// sucess message in a hidden state
successMsg.style.display = "none"


// pay for transaction
function makePayment(){
  if(cardName.value && cardNumber.value && cardCvv.value){
    modal.style.display = "none"
    orderEl.classList.add('hidden')
    totalOrder.classList.add('hidden')
    successMsg.style.display = "block"
    successMsg.innerHTML =`<p>Thanks! ${cardName.value} Your Order(s) are on its way!</p>`
    orderEl.innerHTML = ""
    disappear()
  }else{
    successMsg.textContent ="Error Please complete the form!"
  }
}

function disappear(){
  setTimeout(() =>{
    successMsg.style.display = "none"
    },3000)
}


function render(){
  renderMenu.innerHTML = menu
  orderEl.innerHTML = showCartItem()
}

render()


