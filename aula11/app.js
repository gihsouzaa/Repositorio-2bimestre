const form      = document.querySelector('#formCadastro');
const inputNome = document.querySelector('#inputNome');
const erroNome  = document.querySelector('#erroNome');
const lista     = document.querySelector('#lista');

// setAttribute — desativa o autocomplete do campo
inputNome.setAttribute('autocomplete', 'off');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  cadastrar();
});

let contador = 0;

function cadastrar() {
  const nome = inputNome.value.trim();

  if (nome === '') {
    erroNome.classList.remove('oculto'); // mostra o erro
    return;
  }
  erroNome.classList.add('oculto'); // esconde o erro

   // 1. Criar o card
  const card = document.createElement('div');
  card.classList.add('card');

  // 2. Criar o texto do card
  const texto = document.createElement('span');
  texto.textContent = nome;

  // 3. Criar o botão Excluir
  const btn = document.createElement('button');
  btn.textContent = 'Excluir';
  btn.classList.add('btn-excluir');

   btn.addEventListener('click', function() {
    // parentElement navega do botão para o card pai
    btn.parentElement.remove();
  });

   contador++;
  card.setAttribute('data-id', contador);
  texto.textContent = card.getAttribute('data-id') + ' — ' + nome;


  // 4. Montar e inserir (appendChild)
  card.appendChild(texto);
  card.appendChild(btn);
  lista.appendChild(card);

  // 5. Limpar o campo
  inputNome.value = '';
  inputNome.focus();

}
