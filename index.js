// Função que exibe a lista de dívidas na tela
function renderizarItens() {
  var savedStorage = JSON.parse(localStorage.getItem("debts")) || [];
  var listDebts = document.getElementById("listDebts");
  listDebts.innerHTML = "";

  savedStorage.forEach((item, index) => {
    var typedResult = document.createElement("div");
    typedResult.className = "typedResult";

    var divNameDebts = document.createElement("div");
    divNameDebts.textContent = item.text;
    divNameDebts.className = "nameDebts";

    var divValueThisDebts = document.createElement("div");
    divValueThisDebts.textContent = `R$${item.value.toFixed(2).replace(".", ",")}`;
    divValueThisDebts.className = "valueDebts";

    if (item.finish) {
      divNameDebts.style.textDecoration = "line-through";
      divNameDebts.style.color = "gray";
      divValueThisDebts.style.textDecoration = "line-through";
      divValueThisDebts.style.color = "gray";
    }

    var inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = item.finish;
    inputCheckbox.onchange = function () {
      markDebtPayment(index, inputCheckbox.checked);
    };

    var buttonRemove = document.createElement("button");
    buttonRemove.className = "remove";
    buttonRemove.textContent = "🗑️";
    buttonRemove.onclick = function () {
      removeDebts(index);
    };

    typedResult.appendChild(buttonRemove);
    typedResult.appendChild(divNameDebts);
    typedResult.appendChild(divValueThisDebts);
    typedResult.appendChild(inputCheckbox);

    listDebts.appendChild(typedResult);
  });
}

// Função que adiciona uma nova dívida à lista
function addOnList() {
  var nameDebts = document.getElementById("nameThisDebts");
  var valueDebts = document.getElementById("valueThisDebts");

  var nameThisDebts = nameDebts.value.trim();
  var valueInputRaw = valueDebts.value.trim().replace("R$", "").replace(",", ".").replace(/\s/g, "");

  if (nameThisDebts.length > 30) {
    alert("O nome da dívida não pode ter mais de 30 caracteres.");
    nameDebts.value = "";
    return;
  }

  if (!nameThisDebts) {
    alert("Precisa adicionar um nome válido à dívida.");
    return;
  }

  if (!valueInputRaw || isNaN(valueInputRaw)) {
    alert("Precisa adicionar um valor válido à dívida.");
    valueDebts.value = "";
    return;
  }

  if (valueInputRaw.length > 16) {
    alert("O valor da dívida não pode ter mais de 16 caracteres.");
    valueDebts.value = "";
    return;
  }

  var newDebts = {
    text: nameThisDebts,
    value: parseFloat(valueInputRaw),
    finish: false,
  };

  var savedStorage = localStorage.getItem("debts");
  var debtsJson = savedStorage ? JSON.parse(savedStorage) : [];

  debtsJson.unshift(newDebts);

  localStorage.setItem("debts", JSON.stringify(debtsJson));

  nameDebts.value = "";
  valueDebts.value = "";

  renderizarItens();
}

// Função que marca uma dívida como paga ou não
function markDebtPayment(index, isChecked) {
  var savedStorage = JSON.parse(localStorage.getItem("debts")) || [];
  savedStorage[index].finish = isChecked;
  localStorage.setItem("debts", JSON.stringify(savedStorage));
  renderizarItens();
}

// Função que remove uma dívida da lista
function removeDebts(index) {
  var debtsJson = JSON.parse(localStorage.getItem("debts")) || [];
  debtsJson.splice(index, 1);
  localStorage.setItem("debts", JSON.stringify(debtsJson));
  renderizarItens();
}

// Máscara de dinheiro no input com validação
const inputValor = document.getElementById("valueThisDebts");

inputValor.addEventListener("input", function () {
  let onlyNumbers = this.value.replace(/\D/g, "");

  if (onlyNumbers === "") {
    this.value = "";
    return;
  }

  let formattedValue = (parseInt(onlyNumbers) / 100).toFixed(2);
  this.value = "R$ " + formattedValue.replace(".", ",");
});

inputValor.addEventListener("blur", function () {
  if (!this.value || this.value === "R$ NaN") {
    this.value = "";
  }
});

// Impede digitação de letras no input de valor
inputValor.addEventListener("keypress", function (e) {
  const char = String.fromCharCode(e.which);
  if (!/[0-9]/.test(char)) {
    e.preventDefault();
  }
});

renderizarItens();
