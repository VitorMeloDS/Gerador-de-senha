let caracter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B','C', 'D', 'E', 'F', 'G', 'H', 'I',
 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0, 1, 2,
  3, 4, 5, 6, 7, 8, 9, '!', '@', '#', '$', '&', '%', '{', '}', '[', ']', '?', ';', '(', ')', '*'] 


function gerarSenha() {
  let senha = [];
  tamanhoSenha = document.querySelector('input').value;
  if (tamanhoSenha == ''){
    document.querySelector('#tamanho').innerHTML = 'Digite algum número entre 1 e 100!';
    document.getElementById('tamanho').style.visibility = 'visible';
  }
  else if (tamanhoSenha <= 0) {
    document.querySelector('#tamanho').innerHTML = 'O tamanho da senha tem que ser maior que zero!';
    document.getElementById('tamanho').style.visibility = 'visible';
  } else if (tamanhoSenha > 100) {
    document.querySelector('#tamanho').innerHTML = 'O tamanho máximo da senha é 100!';
    document.getElementById('tamanho').style.visibility = 'visible';
  } else {
    document.querySelector('#tamanho').innerHTML = '';
    document.getElementById('tamanho').style.visibility = 'hidden';
    for (let index = 0; index < tamanhoSenha; index++) {
      senha.push(caracter[Math.floor((Math.random() * caracter.length))])
    }
    document.getElementsByTagName('input')[1].value = senha.join('');
  }
}