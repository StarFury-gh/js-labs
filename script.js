let totalPrice = 0
let hasTicket = false
let hasSales = false

let phoneNumber = ""
let address = ""

let ordered_positions = []

const current_sales = {
    "День сладостей": 0.95,
    "Будни": 0.90,
    "Оплата наличными": 0.3,
}

const btn = document.querySelector("#submit-order-btn")

const form = document.querySelector("#order-form")

const price_p = document.querySelector("#price")
price_p.value = 0

const ticket_btn = document.querySelector("#ticket-btn")

form.addEventListener("submit", (e) => {
    e.preventDefault()
})

btn.addEventListener("mouseover", () => {
    btn.classList.add("btn-hover")
})

btn.addEventListener("mouseout", () => {
    btn.classList.remove("btn-hover")
})

function addToOrder(value) {
    console.log(`Added ${value}$ to order.\nCurrent price: ${totalPrice}`)
    totalPrice += Number(value)
    price_p.textContent = totalPrice
}

function clearPrice() {
    totalPrice = 0
    price_p.textContent = totalPrice
    hasTicket = false
    hasSales = false
    ticket_btn.classList.remove("blocked")
}

function activateSales() {
    const price_with_sales = countPriceWithSales()
    price_p.textContent = price_with_sales
}

function countPriceWithSales() {
    addTicket()
    addSales()
    const result = totalPrice
    return result
}

function addTicket() {
    if (totalPrice < 1000) {
        alert("Скидку можно применить только при заказе от 1000 рублей")
        return
    }
    if (!hasTicket) {
        hasTicket = true
        totalPrice *= 0.9
    }
    ticket_btn.classList.add("blocked")
}

function addSales() {
    maxSale = totalPrice * 0.8
    validSale = totalPrice * 0.90
    minSale = totalPrice * 0.99
    if (!hasSales) {
        for (const sale in current_sales) {
            totalPrice *= current_sales[sale]
            if (totalPrice < maxSale) {
                console.log("Скидка получилась больше максимальной.")
            }
            else if (totalPrice < validSale) {
                console.log("Скидка приобрела валидное значение.")
            }
            else if (totalPrice < minSale) {
                console.log("Скидка прошла барьер минимальной.")
            }
            totalPrice = Math.floor(totalPrice)
            console.log(`Add: ${sale}.\nTotalPrice: ${totalPrice}`)
        }
        hasSales = true
    }
    else {
        alert("Скидки уже применены.")
    }
}

function sendRequest() {
    const phone_field = document.querySelector("#phone")
    const address_field = document.querySelector("#address")
    console.log("Данные заказа:", {
        phone: phone_field.value,
        address: address_field.value,
        price: totalPrice,
    })
}