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

export { center, hover };