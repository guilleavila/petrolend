const router = require("express").Router();
const ApiHandler = require('./../services/APIHandler')
const PriceHandler = new ApiHandler()


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post('/', (req, res, next) => {
  //console.log(req.body)
  PriceHandler
    .getAllGasStations()
    .then(allGas => {
      req.body.forEach(elm => {                                                             // para cada una de las nearby gasolineras
        temp = allGas.data.ListaEESSPrecio.find(element => formatNumber(elm.lat).includes(element['Latitud'].slice(0, 5))
          && formatNumber(elm.lng).includes(element['Longitud (WGS84)'].slice(0, 5)))      // quiero que compares de las de la api la lat y la lng

        elm.priceGA = temp['Precio Gasoleo A']
        elm.priceGP = temp['Precio Gasoleo Premium']
        elm.priceG95 = temp['Precio Gasolina 95 E5']
        elm.priceG98 = temp['Precio Gasolina 98 E5']

        // console.log('holaaaaaa', temp)
      })
      //console.log(req.body)
      res.json(req.body)
    })
    .catch(err => console.log(err))
})

module.exports = router;


// meter en un archivo a parte en utils e importar
function formatNumber(number) {
  let dotNotation = String(Math.trunc(number * 1000) / 1000)
  let index = dotNotation.indexOf('.')
  let part1 = dotNotation.substring(0, index)
  let part2 = dotNotation.substring(index + 1, dotNotation.length)
  let formated = part1 + ',' + part2
  return formated
}