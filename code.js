//-----------------Primeira Entrega-------------------------------


//Gera um número aleatorio para o Bilhete
function createRandomNumber () {
  const randomNumber = (Math.random() * (1000000 - 100000) + 100000).toFixed(0);
  return randomNumber;
}
//Exibe o código do bilhete para o usuário
function showId () {
  let visor = document.getElementById('numrandomid');
  let numberrand = createRandomNumber();
  visor.innerHTML = `<button type="button" class="white-elements numberandom" name="numberandom" id="numrandomid">Seu bilhete: ${numberrand}
  </button>`
  return numberrand;
}
//Verifica se a checkbox está marcada e permite que usuário gere o código do seu bilhete caso esteja
function toggleButton () {
  const checkbox = document.querySelector('#checkbox').checked;

  if (checkbox) {
    document.querySelector('#generate').disabled = false;
    if (generate == false) {
      showId();
    }
    return
  }
  document.querySelector('#generate').disabled = true;
}
// Envia o Bilhete para o backend  
 function cadastraBilhete() {
  
  let id = showId();

  var xhr = new XMLHttpRequest();             
  xhr.open("POST", "http://localhost:3000/Bilhete", true);             
  xhr.setRequestHeader('Content-Type', 'application/json');             
  xhr.send(JSON.stringify({                 
    id:id,           
  }));
}


//-----------------------Segunda Entrega-------------------------------


// Limita o input a numeros e somente 6 digitos e 
window.onload = function()
{
  document.getElementById('ticketCodeField').addEventListener('keyup', function(e)
  {
    this.value = this.value.replace(/[^0-9]/g,'');
    let i = document.getElementById('ticketCodeField').value
    var cond = i.length;
    if(cond <= 6)
    {
      handleChange();//chama a funcao que confere se tudo foi devidamente preenchido
    }
  });
};
// Seleciona as modalidades de bilhetes
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach(option => {
        option.classList.remove("active");
      });
      option.classList.add("active");
      handleChange();
    });
  });
});
//Mensagem "Compra efetuada!"
function showMessageSuccess() {
  let message = document.getElementById('successMessage');
  message.innerHTML = `<p id="successMessage" class="success">Compra efetuada!</p>`
}
//Mensagem "Bilhete inválido digite novamente!"
function showMessageError() {
  let message = document.getElementById('successMessage');
  message.innerHTML = `<p id="successMessage" class="error">Bilhete inválido digite novamente!</p>`
  document.getElementById('ticketCodeField').value = ''
}
//Função para ativar o botão do bilhete
function handleChange () {
  const ticketCode = document.querySelector('#ticketCodeField').value.length;
  const ticketType = document.querySelector('.selected').innerText;
  if ((ticketCode >= 6) && (ticketType != "Escolher modalidade")) {
    document.querySelector('#buyTicketButton').disabled = false;
  }
  else {
    document.querySelector('#buyTicketButton').disabled = true;
  }
} 
// Envia para o Backend a recarga do Bilhete
function recarregaBilhete () {
  const cdb = document.getElementById("ticketCodeField").value;
  const tipo = document.querySelector('.selected').innerText;
  // cdb : codigo do bilhete do usuario
  // tipo : tipo do bilhete escolhido 
  let objRecarga = { cdb:cdb, tipo:tipo };
  let url = `http://localhost:3000/Recarga/`

  let res = axios.post(url, objRecarga)
  .then(response => {
    if (response.data) {
      showMessageSuccess ();
      const msg = new Comunicado (response.data.mensagem);
      console.log(msg.get());            
    }
  })
  .catch(error  =>  {
    if (error.response) {
      showMessageError ();
      const msg = new Comunicado (error.response.data.mensagem);
      console.log(msg.get());            
    }
  })
}




//-----------------------Terceira Entrega-------------------------------

//Mensagem "Bilhete ativo!"
function Message() {
  let activateMessage = document.getElementById('successActivateMessage');
  activateMessage.innerHTML = `<p id="successMessage" class="activeTicket">Bilhete ativo!</p>`
}

//Exibe as informações do código digitado
function visorRecharges() {
  let visorRecharge = document.getElementById('backgroundRecharge');
  visorRecharge.innerHTML = `<div class="menuRecharge" id="backgroundRecharge"><ul class="showRecharges blue-elements" id="dropdownRecharge">
  <li>
  <p class="titleRecharge">
  Recarga única
  </p>

  <p class="durationRecharge">
  40 minutos
  </p>

  </li>

  <li>
  <p class="titleRecharge">
  Recarga de 7 dias
  </p>

  <p class="durationRecharge">
  7 dias
  </p>

  </li>
  
  </ul></div>`
return
}

//Ativar botão "Ativar" e exibe informações do código atráves da função "visorRecharges()"
function handleActivateChange() {
  const codeVerification = document.querySelector('#ticketCodeVerification').value;
  if (codeVerification) {
    visorRecharges();
    document.querySelector('#activateTicketButton').disabled = false;
  }
  else {
    document.querySelector('#activateTicketButton').disabled = true;
  }
}

//Função para avisos
function Comunicado (mensagem) {
  this.mensagem  = mensagem;
  this.get = function ()
  {
    return (this.mensagem);
  }
}
