const mongoose = require('mongoose')

const isAdmin = user => user.role === "ADMIN"

function calculateSaving(amount, highestPrice, purchasePrice) {
  const expensiveAmount = ((stringToNumber(amount) * stringToNumber(highestPrice)) / stringToNumber(purchasePrice))
  const saving = (expensiveAmount - stringToNumber(amount)).toFixed(2)
  return saving
}

function stringToNumber(string) {
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