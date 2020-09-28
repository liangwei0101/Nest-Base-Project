import { getSomeMonthEndDate, getSomeMonthStartDate } from './dateUtil';
import { encryptPassword } from './cryptogramUtil';
import { createSomeDigitNumber, formatAmount } from './stringUtil';
import { updateObjectPartField } from './objectUtil';

describe('dateUtil', () => {
  it('getSomeMonthStartDate', () => {
    const data = getSomeMonthStartDate();
    const dateNow = new Date();
    expect(dateNow.getFullYear()).toBe(data.getFullYear());
    expect(dateNow.getMonth()).toBe(data.getMonth());
    expect(data.getDate()).toBe(1);
  });

  it('getSomeMonthEndDate', () => {
    let lastDay = -1;
    const data = getSomeMonthEndDate();
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (data.getFullYear() % 4 === 0 && (data.getFullYear() % 100 !== 0 || data.getFullYear() % 400 === 0)) {
      days[1] = 29;
    }
    lastDay = days[data.getMonth()];
    expect(lastDay).toBe(data.getDate());
  });

  it('encryptPassword', () => {
    expect(encryptPassword('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
  });

  it('createSomeDigitNumber', () => {
    const digit = 4;
    const str = createSomeDigitNumber(4);
    expect(str.length).toBe(digit);
  });

  it('formatAmount', () => {
    const num = 1000;
    const str = formatAmount(num);
    expect(str).toBe('1,000');
  });

  it('updateObjectPartField', () => {
    const user = { phone: '111', role: '300' };
    const updateUser = { phone: '222', role: 222 };
    const whitelist = ['phone'];
    updateObjectPartField(user, updateUser, whitelist);
    expect(user.phone).toBe(updateUser.phone);
    expect(user.role).toBe('300');
  });
});
