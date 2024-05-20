export const $arrayLastItem = (array) => {
  if (!Array.isArray(array)) return null;
  return array.length ? array[array.length - 1] : null;
};

export const $number = (number) => {
  if (number == undefined) return 0;

  const _number = Number(number);
  return (isNaN(_number) == false) & (_number != null) ? _number : 0;
};
