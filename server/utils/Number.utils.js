const Utils = {};
Utils.isOutOfRange = (number, range) => {
  if (range === undefined || range.min === undefined || range.max === undefined) {
    return null;
  }

  const a = Number(range.min);
  if (isNaN(a)) {
    return null;
  }
  
  const b = Number(range.max);
  if (isNaN(b)) {
    return null;
  }
  
  return number < range.min || number > range.max;
}

module.exports = Utils;