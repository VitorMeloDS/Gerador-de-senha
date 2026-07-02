// Conjuntos de caracteres organizados
const caracteres = {
  maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  minusculas: 'abcdefghijklmnopqrstuvwxyz',
  numeros: '0123456789',
  simbolos: '!@#$%&*{}[]?;()'
};

// Função para obter um caractere aleatório de uma string
function getRandomChar(string) {
  return string[Math.floor(Math.random() * string.length)];
}

// Função para embaralhar array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função principal para gerar senha com garantia de inclusão
function gerarSenha() {
  const inputTamanho = document.getElementById('geraSenha');
  const tamanho = parseInt(inputTamanho.value);
  const spanErro = document.getElementById('tamanho');
  const resultInput = document.getElementById('result');
  const forcaDiv = document.getElementById('forcaSenha');
  
  spanErro.className = '';
  spanErro.textContent = '';
  
  if (isNaN(tamanho) || tamanho < 4) {
    spanErro.textContent = 'Digite um número entre 4 e 128!';
    spanErro.className = 'visible';
    return;
  }
  
  if (tamanho > 128) {
    spanErro.textContent = 'O tamanho máximo da senha é 128!';
    spanErro.className = 'visible';
    return;
  }
  
  const incluirMaiusculas = document.getElementById('incluirMaiusculas').checked;
  const incluirMinusculas = document.getElementById('incluirMinusculas').checked;
  const incluirNumeros = document.getElementById('incluirNumeros').checked;
  const incluirSimbolos = document.getElementById('incluirSimbolos').checked;
  
  if (!incluirMaiusculas && !incluirMinusculas && !incluirNumeros && !incluirSimbolos) {
    spanErro.textContent = 'Selecione pelo menos um tipo de caractere!';
    spanErro.className = 'visible';
    return;
  }
  
  let caracteresDisponiveis = '';
  let tiposSelecionados = [];
  
  if (incluirMaiusculas) {
    caracteresDisponiveis += caracteres.maiusculas;
    tiposSelecionados.push(caracteres.maiusculas);
  }
  if (incluirMinusculas) {
    caracteresDisponiveis += caracteres.minusculas;
    tiposSelecionados.push(caracteres.minusculas);
  }
  if (incluirNumeros) {
    caracteresDisponiveis += caracteres.numeros;
    tiposSelecionados.push(caracteres.numeros);
  }
  if (incluirSimbolos) {
    caracteresDisponiveis += caracteres.simbolos;
    tiposSelecionados.push(caracteres.simbolos);
  }
  
  let senhaArray = [];
  
  tiposSelecionados.forEach(tipo => {
    const char = getRandomChar(tipo);
    senhaArray.push(char);
  });
  
  const tamanhoRestante = tamanho - senhaArray.length;
  for (let i = 0; i < tamanhoRestante; i++) {
    const char = getRandomChar(caracteresDisponiveis);
    senhaArray.push(char);
  }
  
  senhaArray = shuffleArray(senhaArray);
  
  const senha = senhaArray.join('');
  
  resultInput.value = senha;
  
  avaliarForcaSenha(senha, forcaDiv);
  
  resultInput.style.animation = 'none';
  setTimeout(() => {
    resultInput.style.animation = 'fadeIn 0.5s ease';
  }, 10);
}

// Função para avaliar a força da senha
function avaliarForcaSenha(senha, forcaDiv) {
  let forca = 0;
  
  if (senha.length >= 12) forca += 20;
  if (senha.length >= 16) forca += 20;
  if (/[a-z]/.test(senha)) forca += 15;
  if (/[A-Z]/.test(senha)) forca += 15;
  if (/[0-9]/.test(senha)) forca += 15;
  if (/[^a-zA-Z0-9]/.test(senha)) forca += 15;
  if (senha.length >= 20) forca += 10;
  
  forca = Math.min(forca, 100);
  
  forcaDiv.className = 'forca-senha';
  
  if (forca >= 70) {
    forcaDiv.classList.add('forte');
    forcaDiv.title = 'Senha forte';
  } else if (forca >= 40) {
    forcaDiv.classList.add('media');
    forcaDiv.title = 'Senha média';
  } else {
    forcaDiv.classList.add('fraca');
    forcaDiv.title = 'Senha fraca';
  }
}

// Função para copiar senha
function copiarSenha() {
  const resultInput = document.getElementById('result');
  const senha = resultInput.value;
  
  if (!senha) {
    alert('Gere uma senha primeiro!');
    return;
  }
  
  const btn = document.querySelector('.btn-copiar');
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(senha).then(() => {
      btn.classList.add('copiado');
      btn.textContent = '✓';
      
      setTimeout(() => {
        btn.classList.remove('copiado');
        btn.textContent = '📋';
      }, 2000);
    }).catch(() => {
      copiarSenhaFallback(senha);
    });
  } else {
    copiarSenhaFallback(senha);
  }
}

// Fallback para copiar senha
function copiarSenhaFallback(senha) {
  const resultInput = document.getElementById('result');
  resultInput.focus();
  resultInput.select();
  if (resultInput.setSelectionRange) {
    resultInput.setSelectionRange(0, senha.length);
  }

  const btn = document.querySelector('.btn-copiar');
  btn.classList.add('copiado');
  btn.textContent = '✓';

  setTimeout(() => {
    btn.classList.remove('copiado');
    btn.textContent = '📋';
  }, 2000);
}

// Funções para ajustar o tamanho
function aumentarTamanho() {
  const input = document.getElementById('geraSenha');
  let valor = parseInt(input.value) || 4;
  if (valor < 128) {
    input.value = valor + 1;
  }
}

function diminuirTamanho() {
  const input = document.getElementById('geraSenha');
  let valor = parseInt(input.value) || 4;
  if (valor > 4) {
    input.value = valor - 1;
  }
}

// Adicionar evento de Enter no campo de tamanho
document.getElementById('geraSenha').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    gerarSenha();
  }
});

// Event listeners para as checkboxes - gerar senha automaticamente quando mudar
document.querySelectorAll('.opcoes-senha input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.opcoes-senha input[type="checkbox"]');
    let peloMenosUmaMarcada = false;
    checkboxes.forEach(cb => {
      if (cb.checked) peloMenosUmaMarcada = true;
    });
    
    if (!peloMenosUmaMarcada) {
      this.checked = true;
      const spanErro = document.getElementById('tamanho');
      spanErro.textContent = 'Selecione pelo menos um tipo de caractere!';
      spanErro.className = 'visible';
      setTimeout(() => {
        spanErro.className = '';
      }, 3000);
    } else {
      gerarSenha();
    }
  });
});

window.onload = function() {
  gerarSenha();
};