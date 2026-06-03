const form = document.querySelector('#formCadastro');
// Funções auxiliares — evoluem o classList da Aula 11
function mostrarErro(inputId, erroId, msg) {
document.querySelector(inputId).classList.add('campo-erro');
document.querySelector(inputId).classList.remove('campo-ok');
const span = document.querySelector(erroId);
span.textContent = msg;
span.classList.remove('oculto');
}
function limparErro(inputId, erroId) {
document.querySelector(inputId).classList.remove('campo-erro');
document.querySelector(inputId).classList.add('campo-ok');
document.querySelector(erroId).classList.add('oculto');
}
const inputNome = document.querySelector('#inputNome');
inputNome.addEventListener('focus', function() {
limparErro('#inputNome', '#erroNome');
});
inputNome.addEventListener('blur', function() {
if (inputNome.value.trim() === '') {
mostrarErro('#inputNome', '#erroNome', 'Nome obrigatorio');
} else {
limparErro('#inputNome', '#erroNome');
}
});
const inputEmail = document.querySelector('#inputEmail');
inputEmail.addEventListener('focus', function() {
limparErro('#inputEmail', '#erroEmail');
});
inputEmail.addEventListener('blur', function() {
const v = inputEmail.value.trim();
if (!v.includes('@') || !v.includes('.')) {
mostrarErro('#inputEmail', '#erroEmail', 'E-mail invalido');
} else {
limparErro('#inputEmail', '#erroEmail');
}
});
const inputNota = document.querySelector('#inputNota');
inputNota.addEventListener('focus', function() {
  limparErro('#inputNota', '#erroNota');
});
inputNota.addEventListener('blur', function() {
  const v = inputNota.value.trim();
  if (v === '' || isNaN(v)) {
    mostrarErro('#inputNota', '#erroNota', 'Digite um numero');
    return;
  }
  const n = parseFloat(v);
  if (n < 1 || n > 10) {
    mostrarErro('#inputNota', '#erroNota', 'Nota entre 1 e 10');
  } else {
    limparErro('#inputNota', '#erroNota');
  }
});
const inputComentario = document.querySelector('#inputComentario');
const contadorChars   = document.querySelector('#contadorChars');
const LIMITE = 200;
inputComentario.addEventListener('input', function() {
  const qtd = inputComentario.value.length;
  contadorChars.textContent = qtd + ' / ' + LIMITE;
  if (qtd > LIMITE) {
    contadorChars.classList.add('limite');
    mostrarErro('#inputComentario', '#erroComentario',
      'Limite de ' + LIMITE + ' caracteres atingido');
  } else if (qtd < 10) {
    contadorChars.classList.remove('limite');
    mostrarErro('#inputComentario', '#erroComentario',
      'Minimo 10 caracteres');
  } else {
    contadorChars.classList.remove('limite');
    limparErro('#inputComentario', '#erroComentario');
  }
});
function validarNome() {
  if (inputNome.value.trim() === '') {
    mostrarErro('#inputNome', '#erroNome', 'Nome obrigatorio');
    return false;
  }
  limparErro('#inputNome', '#erroNome');
  return true;
}
function validarEmail() {
  const v = inputEmail.value.trim();
  if (!v.includes('@') || !v.includes('.')) {
    mostrarErro('#inputEmail', '#erroEmail', 'E-mail invalido');
    return false;
  }
  limparErro('#inputEmail', '#erroEmail');
  return true;
}
function validarNota() {
  const v = inputNota.value.trim();
  const n = parseFloat(v);
  if (v === '' || isNaN(v) || n < 1 || n > 10) {
    mostrarErro('#inputNota', '#erroNota', 'Nota entre 1 e 10');
    return false;
  }
  limparErro('#inputNota', '#erroNota');
  return true;
}
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const ok = validarNome() & validarEmail() & validarNota();
  if (ok) {
    alert('Avaliacao enviada! Obrigado.');
    form.reset();
  }
});