function center(obj) {
  obj.x -= obj.width / 2;
}

function hover(obj, hovObj) {
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
    return `${(parseFloat(secs) / 60).toFixed(2)} mins`;
  }
  return `${parseFloat(secs).toFixed(2)} secs`;
}

function numIs(elem) {
  return setTimeVal(elem) || '';
}

function strIs(elem) {
  return elem || '';
}

export {
  center,
  hover,
  numIs,
  strIs,
};