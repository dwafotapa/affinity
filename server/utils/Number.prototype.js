Number.prototype.isOutOfRange = function(x, y) {
  if (x === undefined || y === undefined) {
    return null;
  }

  const a = Number(x);
  if (isNaN(a)) {
    return null;
  }
  
  const b = Number(y);
  if (isNaN(b)) {
    return null;
  }
  
  return this.valueOf() < x || this.valueOf() > y;
}