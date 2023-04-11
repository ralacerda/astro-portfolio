---
title: "Descobrindo o maior valor em um Array"
publishDate: 2023-04-11
---

Uma das primeiras questões: Escreva uma função que recebe um array e retorna o maior valor entre os elementos.

```javascript
const numbers = [4, 5, 4, 9, 13, 41, 43, 57, 30];
```

```javascript
function getLargestNumber(numbersArray) {
  return numbersArray.sort().slice(-1)[0];
}

console.log(getLargestNumber(numbers));
// 9
```

```javascript
const numbers = [4, 5, 4, 13, 41, 43, 57, 30, 9];

function getLargestNumber(numbersArray) {
  return [...numbersArray].sort().pop();
}
```

```javascript
function getLargestNumber(numbersArray) {
  return numbersArray.reduce((max, currentNumber) => {
    return currentNumber > max ? currentNumber : max;
  });
}
```

## Bonus

Escreva uma função que receba uma lista de alunos e retorna os alunos com as maiores notas.
Note que a função deve retornar multiplos alunos em alguns casos.
