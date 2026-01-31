let totalPrice = 0
let hasTicket = false
let hasSales = false

let phoneNumber = ""
let address = ""

let ordered_positions = []

const available_positions = [
    "раф",
    "капучино",
    "латте",
    "творожное кольцо",
    "круассан",
    // "пирожок с вишней", // Позиция отсутствует
]

const current_sales = {
    "День сладостей": 0.95,
    "Будни": 0.90,
    "Оплата наличными": 0.80,
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

function addToOrder(value, position) {
    console.log(`Added ${value}$ to order.\nCurrent price: ${totalPrice}`)
    totalPrice += Number(value)
    ordered_positions.push(position)
    price_p.textContent = totalPrice
}

function clearPrice() {
    totalPrice = 0
    price_p.textContent = totalPrice
    hasTicket = false
    hasSales = false
    ticket_btn.classList.remove("blocked")
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
        price_p.textContent = totalPrice
    }
    else {
        alert("Скидки уже применены.")
    }
}

function checkOrderPositions() {
    let i = 0
    do {
        if (!available_positions.includes(ordered_positions[i])) {
            alert(`'${ordered_positions[i]}' сейчас не доступен.`)
            return false
        }
        i++
    } while (i < ordered_positions.length)
    return true
}

function checkPhoneNumber(phone_number) {
    let i = 0
    if (phone_number.length != 11) {
        alert('Введен невалидный номер телефона')
        return false
    }
    while (i < phone_number.length) {
        const is_digit = Number(phone_number).isNaN()
        if (!is_digit) {
            alert("Номер телефона содержит недопустимые символы.")
            return false
        }
    }
    return true
}

function sendRequest() {
    console.log(ordered_positions)
    const phone_field = document.querySelector("#phone")
    const address_field = document.querySelector("#address")

    const is_order_valid = checkOrderPositions()
    const is_phone_number_valid = checkPhoneNumber(phone_field.value)

    if (!is_order_valid.status || !is_phone_number_valid.status) {
        return
    }

    console.log("Данные заказа:", {
        phone: phone_field.value,
        address: address_field.value,
        price: totalPrice,
    })
}