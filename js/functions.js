function getNumber(string) {
  if (!string.match(/\d/)) {
    return NaN;
  }

  string = string.replace(/\D/g,'');

  return Number.parseInt(string, 10);
}

getNumber();


function getRandomNumber(min, max, count) {
  if (isNaN(min && max)) {
    return NaN;
  }
  let rand = Math.abs(min) + Math.random() * (Math.abs(max) + 1 - Math.abs(min));
  rand = rand.toFixed(count);
  return Number(rand);
}

getRandomNumber();

function isPalindrome(string) {
  if (string.toString().split('').reverse().join('') === string.toString()) {
    return true;
  }

  return false;
}

isPalindrome();

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку
//с добавочными символами — и возвращает исходную строку,
//дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
//Если исходная строка превышает заданную длину, она не должна обрезаться.
//Если «добивка» слишком длинная, она обрезается с конца.

// function createString(string, min, newStr) {


// }

// generateString();
