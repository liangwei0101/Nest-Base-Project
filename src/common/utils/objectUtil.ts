/**
 * 更新对象部分字段
 */
export const updateObjectPartField = (targetObject: Object, updateDateObj: Object, whitelist: string[]) => {
  for (const key in targetObject) {
    const updateValue = updateDateObj[key];
    if (updateValue && whitelist.includes(key)) {
      targetObject[key] = updateDateObj[key];
    }
  }
};
