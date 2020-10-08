function center(obj) {
  obj.x -= obj.width / 2;
}

function hover(obj, hovObj) {
  // ----- Submit bttn actions -----
  obj.setInteractive();

  obj.on('pointerover', () => {
    hovObj.setVisible(true);
  });

  obj.on('pointerout', () => {
    hovObj.setVisible(false);
  });
}

function setTimeVal(secs) {
  if (secs > 60) {
    return `${(secs / 60).toFixed(2)} mins`;
  }
  return `${secs.toFixed(2)} secs`;
}

function is(elem) {
  if (typeof elem === 'number') return setTimeVal(elem);
  return elem || ''; // used instead of ternary operator
}

export { center, hover, is };