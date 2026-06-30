const form = document.querySelector('#formCadastro');
const inputNome = document.querySelector('#inputNome');
const inputEmail = document.querySelector('#inputEmail');
const inputCEP = document.querySelector('#inputCEP');
const statusCEP = document.querySelector('#statusCEP');
const erroCEP = document.querySelector('#erroCEP');
const mensagemSucesso = document.querySelector('#mensagemSucesso');
const mensagemErro = document.querySelector('#mensagemErro');
async function buscarCEP(cep) {
    statusCEP.textContent = 'Buscando...';
    erroCEP.classList.add('d-none');
    inputCEP.classList.remove('is-invalid', 'is-valid');
    try {
        const resposta = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
        const dados = await resposta.json();
        if (dados.erro) {
            statusCEP.textContent = '';
            inputCEP.classList.add('is-invalid');
            erroCEP.classList.remove('d-none');
            return;
        }
        statusCEP.textContent = ' Endereço encontrado';
        inputCEP.classList.add('is-valid');
        document.querySelector('#logradouro').value = dados.logradouro || '';
        document.querySelector('#bairro').value = dados.bairro || '';
        document.querySelector('#cidade').value = dados.localidade || '';
        document.querySelector('#uf').value = dados.uf || '';
    } catch (e) {
        statusCEP.textContent = '';
        inputCEP.classList.add('is-invalid');
        erroCEP.textContent = 'Erro de conexao.';
        erroCEP.classList.remove('d-none');
    }
}
inputCEP.addEventListener('blur', function () {
    const cep = inputCEP.value.trim();
    if (cep.length === 8 && !isNaN(cep)) {
        buscarCEP(cep);
    } else if (cep !== '') {
        inputCEP.classList.add('is-invalid');
        erroCEP.textContent = 'CEP: 8 digitos numericos.';
        erroCEP.classList.remove('d-none');
    }

});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const logradouro = document.querySelector('#logradouro').value;
    // validação do formato do e-mail
    if (!email.includes('@') || !email.includes('.')) {
        mensagemErro.textContent = 'Digite um e-mail válido.';
        mensagemErro.classList.remove('d-none');
        mensagemSucesso.classList.add('d-none');
        return;
    }
    // validação dos campos obrigatórios
    if (nome === '' || logradouro === '') {
        mensagemErro.textContent = 'Preencha todos os campos obrigatórios.';
        mensagemErro.classList.remove('d-none');
        mensagemSucesso.classList.add('d-none');
        return;
    }
    mensagemSucesso.textContent =
        'Cadastro confirmado! Bem-vindo(a), ' + nome + '.';
    mensagemSucesso.classList.remove('d-none');
    mensagemErro.classList.add('d-none');
});