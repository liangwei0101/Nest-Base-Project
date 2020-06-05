
/**
* 产生x位的随机数
*/
export const createSomeDigitNumber = (digit: number) => {
  let randomCode = '';
  for (let i = 0; i < digit; i++) {
    randomCode += Math.floor(Math.random() * 10);
  }
  return randomCode;
}