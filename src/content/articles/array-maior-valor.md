---
title: "Retornando o maior valor em um Array"
publishDate: 2023-04-12
---

Procurando por exercícios para praticar Javascript, encontrei a seguinte questão: "Escreva uma função que recebe um array e retorna o maior valor entre os elementos.". É uma tarefa simples, mas ela pode envolver diferentes aspectos do Javascript. Neste artigo, vou apresentar algumas soluções diferentes que eu encontrei para o problema, utilizando três abordagens distintas.

Como exemplo, vamos utilizar o array abaixo. O objetivo é que a função retorne `57`, o maior valor entre os elementos.

```javascript
const numbers = [4, 5, 4, 9, 13, 41, 43, 57, 30];
```

## Utilizando `sort()`

Você pode pensar em solucionar o problema da seguinte forma:

1. Ordernar o array em ordem crescente
2. Retornar o último elemento

Vamos começar com uma versão simples. Você sabe que arrays possuem o método `sort()`, e você sabe que com `slice(-1)[0]` você pode selecionar o último elemento desse array[^1]. Uma possível solução seria:

[^1]: Não é possível acessar um array com uma index negativa no Javascript, por exemplo, usando `array[-1]`

```javascript
function getLargestNumber(numbersArray) {
  return numbersArray.sort().slice(-1)[0];
}

getLargestNumber(numbers); // 9
```

Alguma coisa deu errado. O resultado esperado era `57`, mas a função retornou `9`. Estamos usando o método certo? Pode ser um bug no Javascript? Será que erramos com o `slice(-1)[0]`?

Vamos usar somente o `sort()` no array para entender melhor o que está acontecendo:

```javascript
numbers.sort(); // [ 13, 30, 4, 4, 41, 43, 5, 57, 9 ]
```

O array está ordenado como se os valores fossem strings, e como para o Javascript o string `"9"` é maior que o string `"57"`, a função retorna `9`. Pode parecer estranho, mas é o comportamento esperado do método `sort()`. De acordo com o [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort):

> The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

Para evitar esse comportamento, é necessário passar uma função de comparação como argumento. Essa função recebe dois argumentos (geralmente chamados de `a` e `b`) e o valor retornado determina a posição desses elementos no array ordenado: se a função retorna um valor positivo, `b` vem antes de `a`, se a função retorna um valor negativo, `a` vem antes de `b`.

Como estamos tentando ordenar números de forma crescente, podemos usar a subtração de `a` e `b` para determinar sua ordem[^4]:

[^4]: Por exemplo, dado os valores `a = 4, b = 9`, temos que `a - b = -5`, e portanto `a` deve vir antes do `b`. No caso de `a = 30, b = 5`, `a - b = 25`, e portanto `b` deve vir antes do `a`.

```javascript
numbers.sort((a, b) => a - b); // [ 4, 4, 5, 9, 13, 30, 41, 43, 57 ]
```

Agora que temos o comportamento esperado, podemos refazer a nossa função:

```javascript
function getLargestNumber(numbersArray) {
  return numbersArray.sort((a, b) => a - b).slice(-1)[0];
}

getLargestNumber(numbers); // 57
```

Agora a função funciona como esperado. Entretanto, existe um comportamento importante do `sort()` que não podemos esquecer: ele modifica o array original.

Note que o fato de `numbers` ser uma `const` não impede que os valores dentro do array sejam modificados ou reordenados.

```javascript
numbers.sort((a, b) => a - b); // [ 4, 4, 5, 9, 13, 30, 41, 43, 57 ]
numbers; // [ 4, 4, 5, 9, 13, 30, 41, 43, 57 ]
```

Modificar o array dessa forma pode trazer problemas e bugs inesperados. É importante evitar esse tipo de "efeito colateral" no nosso código.

Uma solução é utilizar o método `sort()` em uma cópia do array original[^2]. A forma mais simples de fazer isso é utilizando a [sintaxe de "espalhamento" (spread)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

[^2]: Já existe uma proposta aceita para um método chamado `toSorted()` que retorna uma cópia do array ordenada. Até o momento, entretanto, somente o Chrome possui o método implementado.

```javascript
function getLargestNumber(numbersArray) {
  return [...numbersArray].sort((a, b) => a - b).slice(-1)[0];
}

getLargestNumber(numbers); // 57
numbers; // [4, 5, 4, 9, 13, 41, 43, 57, 30]
```

Se você não gosta de utilizar `slice(-1)[0]`, você pode utilizar `at(-1)` ou aproveitar que estamos trabalhando com uma cópia do array original e utilizar `pop()`. Dessa forma, nossa função final seria:

```javascript
function getLargestNumber(numbersArray) {
  return [...numbersArray].sort((a, b) => a - b).at(-1);
}
```

## Iterando o array

Outra possível solução do problema seguiria os seguintes passos:

1. Crie uma variável para guardar o maior valor encontrado
2. Para cada elemento do array, se ele for maior que o valor atual da variável, mude o valor da variável para ser o valor do elemento.
3. Retorne a variável

Teriamos a seguinte função:

```javascript
function getLargestNumber(numbersArray) {
  let largestNumber = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbersArray[i] > largestNumber) {
      largestNumber = numbersArray[i];
    }
  }
  return largestNumber;
}

getLargestNumber(numbers); // 57
```

Para o array que estamos usando de exemplo, a função funciona. Mas o que acontece quando um array possui somente valores negativos?

```javascript
getLargestNumber([-10, -1, -30, -45]); // 0
```

Como iniciamos a variável com o valor de 0 e nenhum elemento dentro do array é maior que zero, a função retorna 0 de forma equivocada.

Não definir um valor inicial para `largestNumber` não funciona, pois a comparação `numbersArray[i] > largestNumber` sempre vai retornar `false`. Definir `largestNumber` como `null` também não resolve nosso problema[^3]:

[^3]: Para entender melhor o comportamento do `null` quando comparado com um número, dê uma lida nesse artigo: [Javascript : The Curious Case of Null >= 0](https://blog.campvanilla.com/javascript-the-curious-case-of-null-0-7b131644e274)

```javascript
let largestNumber;

2 > largestNumber; // false
-2 > largestNumber; // false

largestNumber = null;

2 > largestNumber; // true
-2 > largestNumber; // false
```

A solução então é usar o primeiro elemento do Array como valor inicial de `largestNumber` e começar o nosso loop do index 1.

```javascript
function getLargestNumber(numbersArray) {
  let largestNumber = numbersArray[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbersArray[i] > largestNumber) {
      largestNumber = numbersArray[i];
    }
  }
  return largestNumber;
}

getLargestNumber(numbers); // 57

const negativeNumbers = [-4, -5, -4, -9, -1, -3];
getLargestNumber(negativeNumbers); // -1
```

A função agora funciona corretamente para os dois tipos de array, mas eu particularmente prefiro utilizar `for...of` para loops. Esse formato ajuda a evitar erros e deixa o código mais limpo e fácil de entender:

```javascript
function getLargestNumber(numbersArray) {
  let largestNumber = numbersArray[0];
  for (const number of numbersArray) {
    if (number > largestNumber) {
      largestNumber = number;
    }
  }
  return largestNumber;
}
```

Entretanto, outra forma de aplicar essa estratégia é utilizando o método `reduce()`. O `reduce()` itera o array, aplicando uma função que recebe pelo menos dois valores, um acumulador e o elemento atual, e o retorno dessa função será o novo valor do acumulador. Se você omite o valor inicial do acumulador, o primeiro elemento do array é utilizado.

Com o `reduce()` podemos escrever a função da seguinte forma:

```javascript
function getLargestNumber(numbersArray) {
  return numbersArray.reduce((accumulator, number) => {
    if (number > accumulator) {
      return number;
    } else return accumulator;
  });
}

getLargestNumber(numbers); // 57

const negativeNumbers = [-4, -5, -4, -9, -1, -3];
getLargestNumber(negativeNumbers); // -1
```

O primeiro elemento do array vira o acumulador (`accumulator`) e é comparado com o próximo elemento (`number`). Se o elemento é maior que acumulador, retornamos o elemento, se não, retornamos o acumulador. O valor retornado vira o novo acumulador que será comparado com o próximo elemento, e assim por diante.

Utilizando o [Operador Condicional Ternário](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_operator) podemos simplificar ainda mais o corpo da função:

```javascript
function getLargestNumber(numbersArray) {
  return numbersArray.reduce((accumulator, number) => {
    return number > accumulator ? number : accumulator;
  });
}
```

## Utilizando Math.max()

Na minha opinião, a forma mais fácil e rápida de resolver o problema.
O objeto global `Math` possui o método `max()` que retorna o maior valor entre os argumentos passados.

Para passar um array como uma lista de argumentos usamos o método `apply()`[^5]. Podemos escrever a função da seguinte forma:

[^5]: Funções do Javascript [também são objetos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Function) e possuem métodos.

```javascript
function getLargestNumber(numbersArray) {
  return Math.max.apply(null, numbersArray);
}

getLargestNumber(numbers); // 57
```

Mas aqui também podemos usar a sintaxe de "espalhamento" (spread).

```javascript
function getLargestNumber(numbersArray) {
  return Math.max(...numbersArray);
}

getLargestNumber(numbers); // 57
```

## Conclusão

Chegamos em quatros formas diferentes de escrever a função:

```javascript
function getLargestNumberBySort(numbersArray) {
  return [...numbersArray].sort((a, b) => a - b).at(-1);
}

function getLargestNumberByFor(numbersArray) {
  let largestNumber = numbersArray[0];
  for (const number of numbersArray) {
    if (number > largestNumber) {
      largestNumber = number;
    }
  }
  return largestNumber;
}

function getLargestNumberByReduce(numbersArray) {
  return numbersArray.reduce((accumulator, number) => {
    return number > accumulator ? number : accumulator;
  });
}

function getLargestNumberByMax(numbersArray) {
  return Math.max(...numbersArray);
}
```

Qual é a forma mais correta? Eu acredito que, antes de considerar a performance, o uso de memória ou linhas de código, a legibilidade deve ser levada em conta. Para mim, a versão que utiliza `Math.max()` é a mais simples e rápida de entender.

Lógico que essas funções também não são perfeitas e cada uma lida de uma forma diferente com casos extremos. O contexto que vai determinar quais mudanças na função são necessárias para melhor lidar com esses casos.

```javascript
getLargestNumberBySort([]); // undefined
getLargestNumberByFor([]); //  undefined
getLargestNumberByReduce([]); // ERRO: Reduce of empty array with no initial value
getLargestNumberByMax([]); // -Infinity

getLargestNumberBySort(["string", 4, 6]); // 6
getLargestNumberByFor(["string", 4, 6]); // string
getLargestNumberByReduce(["string", 4, 6]); // string
getLargestNumberByMax(["string", 4, 6]); // NaN
```

Mesmo que você já saiba como resolver um problema, eu ainda acho que vale a pena explorar outras soluções quando você está estudando uma linguagem. Além de ajudar a revisar alguns conceitos fundamentais, você consegue praticar o uso de certas funções, e essas diferentes abordagens podem te ajudar com ideias em outros cenários e situações.
