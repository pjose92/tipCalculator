const billInputEl = document.querySelector("#bill");
const percentBtns = Array.from(document.querySelectorAll(".card__btn"));
percentBtns.pop(); // Takes off custom field from btn array
const customFieldEl = document.querySelector("#custom");
const nbOfPplInputEl = document.querySelector("#nbOfPpl");

const resetBtn = document.querySelector("#reset");

const tipAmountEl = document.querySelector("#tip-amount");
const totalAmountEl = document.querySelector("#total-amount");

let bill = 0;
let tip = 0;
let nbOfPpl = 1;

const tipAmount = () => ((bill * (tip / 100)) / nbOfPpl).toFixed(2);
const totalAmount = () =>
  (bill / nbOfPpl + (bill * (tip / 100)) / nbOfPpl).toFixed(2);

const resetCustomField = function () {
  customFieldEl.value = "";
  customFieldEl.classList.remove("card__custom--active");
};

const displayResults = function () {
    tipAmountEl.innerText =
    tipAmount() === "NaN" || tipAmount() === "Infinity"
      ? "$0.00"
      : `$${tipAmount()}`;
    totalAmountEl.innerText =
    totalAmount() === "NaN" || totalAmount() === "Infinity"
      ? "$0.00"
      : `$${totalAmount()}`;   
};

const resetFields = function () {
    billInputEl.value ="";
    resetCustomField();
    nbOfPplInputEl.value = "";
    bill = 0;
    tip = 0;
    nbOfPpl = 0;
    displayResults();
}

billInputEl.addEventListener("keypress", function (e) {
  if (Number(e.key) || e.key === "0") {
    bill = Number(billInputEl.value + Number(e.key));
    console.log(bill);
    displayResults();
  }
});

const getBtnPercentValue = function (btn) {
  return parseInt(btn.innerText.replace("%", ""));
};

percentBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    resetCustomField();
    percentBtns.forEach(
      (button) =>
        button.classList.contains("card__btn--active") &&
        button.classList.remove("card__btn--active")
    );
    btn.classList.add("card__btn--active");
    tip = getBtnPercentValue(btn);
    console.log(tip);
    displayResults();
  });
});

customFieldEl.addEventListener("keypress", function (e) {
  percentBtns.forEach(
    (button) =>
      button.classList.contains("card__btn--active") &&
      button.classList.remove("card__btn--active")
  );

  if (Number(e.key) || e.key === "0") {
    if (customFieldEl.value.length < 2) {
      tip = Number(customFieldEl.value + Number(e.key));
      console.log(tip);
      displayResults();
    }
  }
});

nbOfPplInputEl.addEventListener("keypress", function (e) {
  if (Number(e.key) || e.key === "0") {
    nbOfPpl = Number(nbOfPplInputEl.value + Number(e.key));
    console.log(nbOfPpl);
    displayResults();
  }
});

resetBtn.addEventListener("click", resetFields);