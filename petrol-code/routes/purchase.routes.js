const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const { calculateSaving } = require('../utils/index')
const Purchase = require("../models/Purchase.model");

let prevPage = 0
let nextPage = 0
router.get("/", isLoggedIn, (req, res, next) => {

  const { page } = req.query

  switch (page) {
    case '1':
      prevPage = 0
      nextPage = 4
      break
    case '2':
      prevPage = 5
      nextPage = 4
      break
    case '3':
      prevPage = 10
      nextPage = 4
      break
    case '4':
      prevPage = 15
      nextPage = 4
      break
    case '5':
      prevPage = 20
      nextPage = 4
      break
  }

  Purchase
    .find({ owner: req.session.currentUser._id })
    .sort({ createdAt: -1 })
    .then(purchases => {
      const fiteredArr = purchases.splice(prevPage, nextPage)
      res.render('purchase/purchase-list', { fiteredArr, page })
    })
    .catch(err => next(err))
})

// create purchase

router.post("/crear", isLoggedIn, (req, res, next) => {
  const { amount, purchasePrice, highestPrice } = req.body;
  const owner = req.session.currentUser._id
  const saving = calculateSaving(amount, highestPrice, purchasePrice)

  Purchase
    .create({ amount, purchasePrice, highestPrice, saving, owner })
    .then(() => res.redirect('/gastos?page=1'))
    .catch(err => next(err))
})


// edit 
router.get('/editar/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params

  Purchase
    .findById(id)
    .then(purchase => res.render('purchase/purchase-edit', purchase))
    .catch(err => next(err))
})

router.post('/editar/:id', (req, res, next) => {
  const { id } = req.params
  const { amount, highestPrice, purchasePrice } = req.body
  const saving = calculateSaving(amount, highestPrice, purchasePrice)

  Purchase
    .findByIdAndUpdate(id, { amount, saving }, { new: true })
    .then(() => res.redirect('/gastos'))
    .catch(err => next(err))
})


// delete

router.post('/eliminar-gasto/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params

  Purchase
    .findByIdAndDelete(id)
    .then(res.redirect('/gastos'))
    .catch(err => next(err))
})


module.exports = router;