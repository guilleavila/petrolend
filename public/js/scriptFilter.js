const numberP = document.getElementById('pValue')

const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

prevBtn.onclick = () => {
    if (numberP.innerText > 1) {
    numberP.innerHTML = Number(numberP.innerHTML) - 1
    location.href = `http://localhost:5005/gastos?page=${numberP.innerHTML}`
    }
}

nextBtn.onclick = () => {
    if (numberP.innerText > 0) {
        numberP.innerHTML = Number(numberP.innerHTML) + 1
        location.href = `http://localhost:5005/gastos?page=${numberP.innerHTML}`
    }
}