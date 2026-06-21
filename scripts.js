const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")

async function getRates() {
        try {
                const response = await fetch(
                        "https://v6.exchangerate-api.com/v6/3f2af202a4e99f348ca84e4a/latest/BRL")

        const data = await response.json()

                return data.conversion_rates
        } catch (error) {
                console.error("Erro ao buscar cotações:", error)
                return null
        }
}

async function convertCurrency() {

        const inputCurrency = Number(document.querySelector(".input-currency").value)

        const currencyValueToConvert = document.querySelector(".currency-value-to-convert")

        const currencyValueConverted = document.querySelector(".currency-value")

        const rates = await getRates()

        if (!rates) return

        if (currencySelect.value === "dolar") {
                currencyValueConverted.innerHTML =
                        new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD"
                        }).format(inputCurrency * rates.USD)
        }

        if (currencySelect.value === "euro") {
                currencyValueConverted.innerHTML =
                        new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR"
                        }).format(inputCurrency * rates.EUR)
        }

        if (currencySelect.value === "libra") {
                currencyValueConverted.innerHTML =
                        new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "GBP"
                        }).format(inputCurrency * rates.GBP)
        }

        currencyValueToConvert.innerHTML =
                new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                }).format(inputCurrency)
}

function changeCurrency() {

        const currencyName = document.getElementById("currency-name")
        const currencyImg = document.querySelector(".currency-img")

        if (currencySelect.value === "dolar") {
                currencyName.innerHTML = "Dólar americano"
                currencyImg.src = "./assepts/dólar.png"
        }

        if (currencySelect.value === "euro") {
                currencyName.innerHTML = "Euro"
                currencyImg.src = "./assepts/euro.png"
        }

        if (currencySelect.value === "libra") {
                currencyName.innerHTML = "Libra esterlina"
                currencyImg.src = "./assepts/libra.png"
        }

        convertCurrency()
}

currencySelect.addEventListener("change", changeCurrency)

convertButton.addEventListener("click", convertCurrency)