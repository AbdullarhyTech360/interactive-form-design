// Handing the form submission
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    validateInputs()
})

// Setting error messages
const setError = (input, message) => {
    let parentContainer
    if (input.classList.contains("exp-input")) {
        parentContainer = input.parentElement.parentElement
    } else {
        parentContainer = input.parentElement
    }
    const errorMsg = parentContainer.querySelector('.error-message')
    errorMsg.innerText = message
    errorMsg.style.display = 'block'
    input.classList.add('error-input')

}

// Removing error messages
const removeError = (input) => {
    let parentContainer
    if (input.classList.contains("exp-input")) {
        parentContainer = input.parentElement.parentElement
    } else {
        parentContainer = input.parentElement
    }
    const errorMsg = parentContainer.querySelector('.error-message')
    errorMsg.innerText = ''
    errorMsg.style.display = 'none'
    input.classList.remove('error-input')
}

// Validation of form inputs
const validateInputs = () => {
    // Determining the inputs values
    const cardName = document.getElementById('cardholder-name')
    const cardNmber = document.getElementById('card-number')
    const expireMonthDate = document.querySelectorAll('.exp-input')
    const cvc = document.getElementById('cvc')

    // checking each  input value and displaying the error message
    if (cardName.value === '') {
        setError(cardName, 'This field is required')
    } else {
        removeError(cardName)
    }

    // Inside validateInputs function, get the raw value without spaces
    if (cardNmber.value === '') {
        setError(cardNmber, "Can't be blank")
    } else {
        const rawCardNumber = cardNmber.value.replace(/\s/g, '')

        // First check if input contains only digits
        if (!/^\d+$/.test(rawCardNumber)) {
            setError(cardNmber, 'Wrong format, numbers only')
        }
        // Then check for exact length of 16
        else if (rawCardNumber.length !== 16) {
            setError(cardNmber, 'Must be 16 digits')
        }
        else {
            removeError(cardNmber)
        }
    }

    const expMonth = document.getElementById('exp-month')
    const expYear = document.getElementById('exp-year')

    // Inside validateInputs function
    let isExpiredMonth = false
    if (expMonth.value === '') {
        setError(expMonth, "Can't be blank")
        isExpiredMonth = true
    } else {
        const month = parseInt(expMonth.value)
        if (!/^\d+$/.test(expMonth.value)) {
            isExpiredMonth = true
            setError(expMonth, 'Numbers only')
        } else if (month < 1 || month > 12) {
            isExpiredMonth = true
            setError(expMonth, 'Must be valid month')
        } else {
            isExpiredMonth = false
            removeError(expMonth)
        }
    }

    if (expYear.value === '') {
        setError(expYear, "Can't be blank")
    } else {
        const year = parseInt(expYear.value)
        const currentYear = new Date().getFullYear() % 100
        if (!/^\d+$/.test(expYear.value)) {
            setError(expYear, 'Numbers only')
        } else if (year < currentYear) {
            setError(expYear, 'Must be valid year')
        } else {
            if (!isExpiredMonth) {
                removeError(expYear)
            }
        }
    }


    if (cvc.value === '') {
        setError(cvc, "Can't be blank")
    } else if (cvc.value.length != 3) {
        setError(cvc, "Must be 3 digits")
    } else if (!/^\d{3}$/.test(cvc.value)) {
        setError(cvc, "Must be exactly 3 digits")
    }
    else {
        removeError(cvc)
    }
}

const cardNumberRegex = /^(\d{4}\s?){4}$/

const cardNmber = document.getElementById('card-number')

cardNmber.addEventListener('input', (e) => {
    // Get raw value without spaces
    let rawValue = e.target.value.replace(/\s/g, '')

    // Store raw digits as input value
    cardNmber.dataset.value = rawValue

    // Format with spaces for display
    let formattedValue = rawValue.replace(/(.{4})/g, '$1 ').trim()
    console.log(formattedValue.split(' ').join('').length)
    // Show formatted value to user
    e.target.value = formattedValue.toUpperCase()
})

const cvc = document.getElementById('cvc')
cvc.addEventListener('input', (e) => {
    // Remove decimals and non-numeric characters
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
});
