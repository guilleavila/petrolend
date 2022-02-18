const mongoose = require('mongoose')

//role
const isAdmin = user => user.role === "ADMIN"

function calculateSaving(amount, highestPrice, purchasePrice) {
    console.log('cantidad pagada', amount)
    console.log('precio caro', highestPrice)
    console.log('precio elegido', purchasePrice)
    const expensiveAmount = ((stringToNumber(amount) * stringToNumber(highestPrice)) / stringToNumber(purchasePrice))
    console.log('coste en caso de gasolinera cara', expensiveAmount)
    const saving = (expensiveAmount - stringToNumber(amount)).toFixed(2)
    console.log('ahorro', saving)
    return saving
}

function stringToNumber(string) {
    console.log(string)
    // const newNumber = parseInt(addDot(string) * 1000)
    const newNumber = string.replace(',', '.') * 1

    return newNumber
}

function formatNumber(number) {
  let dotNotation = String(Math.trunc(number * 1000) / 1000)
  let index = dotNotation.indexOf('.')
  let part1 = dotNotation.substring(0, index)
  let part2 = dotNotation.substring(index + 1, dotNotation.length)
  let formated = part1 + ',' + part2
  return formated
}

module.exports = { isAdmin, calculateSaving, stringToNumber, formatNumber }