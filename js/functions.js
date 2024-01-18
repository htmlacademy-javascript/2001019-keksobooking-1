function getNumber(string) {
  if (!string.match(/\d/)) {
    return NaN;
  }

  string = string.replace(/\D/g,'');

  return Number.parseInt(string, 10);
}

getNumber();

function getRandomNumber(min, max, count) {
  const rand = Math.abs(min) + Math.random() * (Math.abs(max) + 1 - Math.abs(min));
  return Number(rand.toFixed(count));
}

getRandomNumber();
function isPalindrome(string) {
  string = string.toLowerCase().split('');
  return string.reverse().join('') === string.join('');
}

isPalindrome();

function padStart(rawString, size, template) {
  if (rawString.length > size) {
    return rawString;
  }

  while (rawString.length <= size) {
    if (rawString.length + template.length > size) {
      return template.slice(0, Math.abs(rawString.length - size)) + rawString;
    }
    rawString = template + rawString;
  }
  return rawString;
}

padStart();
