const router = require("express").Router();
const Purchase = require("../models/Purchase.model");

// const ApiHandler = require("./../services/APIHandler");
// const PriceHandler = new ApiHandler();

// all purchases
router.get("/", (req, res, next) => {
  Purchase
    .find({ owner: req.session.currentUser._id })
    .sort({ createdAt: -1 })
    .then(purchases => res.render('purchase/purchase-list', { purchases }))
})

// create purchase

router.post("/crear", (req, res, next) => {
  const { amount, purchasePrice, highestPrice } = req.body;
  const owner = req.session.currentUser._id
  const saving = calculateSaving(amount, highestPrice, purchasePrice)

  Purchase
    .create({ amount, purchasePrice, highestPrice, saving, owner })
    .then(() => res.redirect('/gastos'))
    .catch(err => next(err))
})

module.exports = router;



function calculateSaving(amount, highestPrice, purchasePrice) {
  console.log('cantidad pagada', amount)
  console.log('precio caro', highestPrice)
  console.log('precio elegido', purchasePrice)
  const expensiveAmount = ((stringToNumber(amount) * stringToNumber(highestPrice)) / stringToNumber(purchasePrice))
  console.log('coste en caso de gasolinera cara',  expensiveAmount)
  const saving = (expensiveAmount - stringToNumber(amount)).toFixed(2)
  console.log('ahorro', saving)
  return saving
}

function stringToNumber(string) {
  console.log(string)
  const newNumber = parseInt(addDot(string) * 1000)
  console.log(newNumber)
  return newNumber
}

function addDot(string) {
  let index = string.indexOf(',')
  let part1 = string.substring(0, index)
  let part2 = string.substring(index + 1, string.length)
  let formated = part1 + '.' + part2
  console.log(formated)
  return formated
}