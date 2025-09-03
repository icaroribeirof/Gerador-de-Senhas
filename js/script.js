// Cria a função "getCharTypes" para ver quais campos estão marcados
function getCharTypes() {

    // Cria a variável para letras maiúsculas
    const uppercase = document.querySelector('#include-uppercase').checked;

    // Cria a variável para letras minúsculas
    const lowercase = document.querySelector('#include-lowercase').checked;

    // Cria a variável para números
    const number = document.querySelector('#include-number').checked;

    // Cria a variável para caracteres especiais
    const specialCharacter = document.querySelector('#include-special-character').checked;

    // Cria a variável que vai obter todos os tipos
    const charTypes = [];

    // Verifica se as letras maísculas estão marcadas
    if (uppercase) {
        // Envia para dentro do array todas as letras maiúsculas
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    // Verifica se as letras minúsculas estão marcadas
    if (lowercase) {
        // Envia para dentro do array todas as letras minúsculas
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    // Verifica se os números estão marcados
    if (number) {
        // Envia para dentro do array todos os números
        charTypes.push('0123456789');
    }

    // Verifica se as letras os caracteres especiais estão marcados
    if (specialCharacter) {
        // Envia para dentro do array todos os caracteres especiais
        charTypes.push('!@#$%^&()_-+={}[]|\\/?><:;"\'.,~`');
    }

    // Retorna o array com os dados inseridos
    return charTypes;

}

// Cria a função para pegar o tamanho da senha
function getPasswordSize() {

    // Cria a variável size para pegar o tamanho definido no campo "Quantidade de caracteres"
    const size = document.querySelector('#size').value;

    // Verifica se o campo de "Quantidade de caracteres" é realmente um número
    // ou se size é menor que 4
    // ou se for maior que 128
    // caso seja, alerta o usuário que o tamanho é inválido
    if(isNaN(size) || size < 4 || size > 128) {
        message('Tamanho inválido, digite um número entre 4 e 128!', 5000, 'warning');
    }
    
    // Retorna o tamanho desejado para a senha
    return size;
}

// Cria a função para pegar caracteres aleatórios e popular no array
function randomCharTypes(charTypes) {
    
    // Cria uma variável de index aleatório que armazena números aleatórios gerados de acordo com o que for selecionado, na ordem que foi passado no array
    // Math.random gera um número aleatório referente a quantidades de itens do array "charTypes"
    // Math.floor remove as casas decimais
    const randomIndex = Math.floor(Math.random() * charTypes.length);

    // Pega um caracter aleatório de dentro de cada um dos indexes selecionados no array anteriormente
    //return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

// Gera a senha a partir do tamanho e a partir do número aleatório gerado
function generatePassword(size, charTypes) {
    
    // Cria a variável da senha gerada
    let passwordGenerated = '';

    // Gera um caracter aleatório até que a senha tenha o tamanho preenchido em "Quantidade de caracteres" 
    while (passwordGenerated.length < size) {
        passwordGenerated += randomCharTypes(charTypes);
    }

    // Retorna a senha gerada
    return passwordGenerated;
}

// Cria uma função de mensagem de alerta utilizando a biblioteca Toastify
function message(text, duration, status = 'success') {
    Toastify({
            text: text,
            duration: duration,
            style: {
                background: status === 'success' ? '#84cc16': '#dc2626',
                boxShadow: 'none'
            }
        }).showToast();
}

// Ação ao clicar no botão "Gerar"
document.querySelector('#generate').addEventListener('click', function() {

    // Pega o tamanho da senha
    const size = getPasswordSize();
    
    // Pega os tipos escolhidos
    const charTypes = getCharTypes();

    // Verifica se o tamanho é inválido, caso seja retorna a mensagem de erro
    if (!size) {
        return;
    }

    // Verifica se o array é vazio e caso seja alerta o usuário
    if (!charTypes.length) {
        message('Selecione pelo menos um tipo de caracter!', 5000, 'waring');
        return;
    }

    // Pega a senha gerada
    const passwordGenerated = generatePassword(size, charTypes);

    // Cria a classe "show"
    document.querySelector('#password-container').classList.add('show');

    // Mostra no HTML a senha gerada
    document.querySelector('#password').textContent = passwordGenerated;
})

// Pega o botão de copiar e cria um evento de click na função
document.querySelector('#copy').addEventListener('click', function() {

    // Copia o conteúdo da senha
    navigator.clipboard.writeText(document.querySelector('#password').textContent);

    // Exibe a mensagem de que o conteúdo foi copiado
    message('Senha copiada com sucesso!', 5000, 'success');
})