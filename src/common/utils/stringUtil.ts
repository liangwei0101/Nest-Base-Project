
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


/**
* 数字格式化
*/
export const formatAmount = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}