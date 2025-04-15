// Função que exibe a lista de dívidas na tela
function renderizarItens() {
  // Pega os dados salvos no localStorage (ou um array vazio se não houver dados)
  var savedStorage = JSON.parse(localStorage.getItem("debts")) || [];

  // Pega o elemento da lista onde as dívidas serão exibidas
  var listDebts = document.getElementById("listDebts");

  // Limpa a lista antes de renderizar novamente
  listDebts.innerHTML = "";

  // Percorre cada item da lista de dívidas
  savedStorage.forEach((item, index) => {
    // Cria um container para cada dívida
    var typedResult = document.createElement("div");
    typedResult.className = "typedResult";

    // Cria a div com o nome da dívida
    var divNameDebts = document.createElement("div");
    divNameDebts.textContent = item.text;
    divNameDebts.className = "nameDebts";

    // Cria a div com o valor da dívida
    var divValueThisDebts = document.createElement("div");
    divValueThisDebts.textContent = `R$${item.value.toFixed(2)}`;
    divValueThisDebts.className = "valueDebts";

    // Se a dívida estiver marcada como "paga"
    if (item.finish) {
      // Risca o texto e muda a cor para cinza
      divNameDebts.style.textDecoration = "line-through";
      divNameDebts.style.color = "gray";
      divValueThisDebts.style.textDecoration = "line-through";
      divValueThisDebts.style.color = "gray";
    }

    // Cria a caixinha de checkbox para marcar como pago
    var inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = item.finish;

    // Atualiza o status quando o checkbox for marcado/desmarcado
    inputCheckbox.onchange = function () {
      markDebtPayment(index, inputCheckbox.checked);
    };

    // Cria o botão de remover a dívida
    var buttonRemove = document.createElement("button");
    buttonRemove.className = "remove";
    buttonRemove.textContent = "🗑️";

    // Define o comportamento ao clicar no botão de remover
    buttonRemove.onclick = function () {
      removeDebts(index);
    };

    // Adiciona os elementos na ordem certa dentro do container
    typedResult.appendChild(buttonRemove);
    typedResult.appendChild(divNameDebts);
    typedResult.appendChild(divValueThisDebts);
    typedResult.appendChild(inputCheckbox);

    // Adiciona o container da dívida na lista principal
    listDebts.appendChild(typedResult);
  });
}

// Função que adiciona uma nova dívida à lista
function addOnList() {

  var nameDebts = document.getElementById('nameThisDebts')
  var valueDebts = document.getElementById('valueThisDebts')

  // Pega os valores digitados nos campos de nome e valor da dívida
  var nameThisDebts = document.getElementById("nameThisDebts").value.trim();

  if (nameThisDebts.length > 30) {
    alert("O nome da dívida não pode ter mais de 30 caracteres.");
    nameDebts.value = "";
    return;
  } if(!nameThisDebts){
    alert("Pecisa adicionar um nome valido a dívida.")
    return;
  }
  var valueThisDebts = document.getElementById("valueThisDebts").value.trim();

  if(valueThisDebts.length > 16) {
    alert("O valor da dívida não pode ter mais de 16 caracteres.")
    valueDebts.value = ""
    return;
  } if(!valueThisDebts){
    alert("Pecisa adicionar um valor valido a dívida.")
    return;

  }

  // Se os campos estiverem vazios, a função para aqui
  if (!nameThisDebts || !valueThisDebts) return;

  // Cria um objeto com os dados da nova dívida
  var newDebts = {
    text: nameThisDebts,
    value: parseFloat(valueThisDebts),
    finish: false, // Define que ainda não foi paga
  };

  // Recupera a lista atual de dívidas do localStorage
  var savedStorage = localStorage.getItem("debts");

  // Converte a lista salva para array, ou cria um novo array vazio
  var debtsJson = savedStorage ? JSON.parse(savedStorage) : [];

  // Adiciona a nova dívida no início da lista
  debtsJson.unshift(newDebts);

  // Salva a nova lista no localStorage
  localStorage.setItem("debts", JSON.stringify(debtsJson));

  // Limpa os campos de entrada
  document.getElementById("nameThisDebts").value = "";
  document.getElementById("valueThisDebts").value = "";

  // Atualiza a lista exibida na tela
  renderizarItens();
}

// Função que marca uma dívida como paga ou não
function markDebtPayment(index, isChecked) {
  // Recupera a lista atual de dívidas
  var savedStorage = JSON.parse(localStorage.getItem("debts")) || [];

  // Atualiza o campo 'finish' da dívida selecionada
  savedStorage[index].finish = isChecked;

  // Salva a lista atualizada no localStorage
  localStorage.setItem("debts", JSON.stringify(savedStorage));

  // Atualiza a exibição da lista
  renderizarItens();
}

// Função que remove uma dívida da lista
function removeDebts(index) {
  // Recupera a lista atual de dívidas
  var debtsJson = JSON.parse(localStorage.getItem("debts")) || [];

  // Remove a dívida da posição indicada
  debtsJson.splice(index, 1);

  // Salva a nova lista no localStorage
  localStorage.setItem("debts", JSON.stringify(debtsJson));

  // Atualiza a exibição da lista
  renderizarItens();
}  renderizarItens();
