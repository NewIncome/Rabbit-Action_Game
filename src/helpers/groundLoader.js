const GndCreate = (() => {
  const repeatTileOnX = (x, y, scene, tile, n) => {
    for (let i = 50; i <= n * 50; i += 50) {
      scene.add.image(x + i, y, tile).setScale(0.2);
    }
  };

  const repeatTileOnY = (x, y, scene, tile, n) => {
    for (let i = 50; i <= n * 50; i += 50) {
      scene.add.image(x, y + i, tile).setScale(0.2);
    }
  };

  // ---------- FLAT Lands ----------
  const makeFlatLand1 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-flat-l').setScale(0.2);
    repeatTileOnX(xPos, yPos, scene, 'tile-flat-m', 2);
    // scene.add.image(xPos + 50, yPos, 'tile-flat-m').setScale(0.2);
    // scene.add.image(xPos + 100, yPos, 'tile-flat-m').setScale(0.2);
    scene.add.image(xPos + 150, yPos, 'tile-flat-r').setScale(0.2);
  };

  const makeFlatLand2 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-flat-l').setScale(0.2);
    repeatTileOnX(xPos, yPos, scene, 'tile-flat-m', 3);
    // scene.add.image(xPos + 50, yPos, 'tile-flat-m').setScale(0.2);
    // scene.add.image(xPos + 100, yPos, 'tile-flat-m').setScale(0.2);
    // scene.add.image(xPos + 150, yPos, 'tile-flat-m').setScale(0.2);
    scene.add.image(xPos + 200, yPos, 'tile-flat-r').setScale(0.2);
  };

  const makeFlatLand3 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-flat-l').setScale(0.2);
    repeatTileOnX(xPos, yPos, scene, 'tile-flat-m', 4);
    // scene.add.image(xPos + 50, yPos, 'tile-flat-m').setScale(0.2);
    // scene.add.image(xPos + 100, yPos, 'tile-flat-m').setScale(0.2);
    // scene.add.image(xPos + 150, yPos, 'tile-flat-m').setScale(0.2);
    // scene.add.image(xPos + 200, yPos, 'tile-flat-m').setScale(0.2);
    scene.add.image(xPos + 250, yPos, 'tile-flat-r').setScale(0.2);
  };

  // ---------- MEDIUM Lands ----------
  const makeMdLand1 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-md-t').setScale(0.2);
    repeatTileOnY(xPos, yPos, scene, 'tile-md-m', 2);
    // scene.add.image(xPos, yPos + 50, 'tile-md-m').setScale(0.2);
    // scene.add.image(xPos, yPos + 100, 'tile-md-m').setScale(0.2);
    scene.add.image(xPos, yPos + 150, 'tile-md-b').setScale(0.2);
  };

  const makeMdLand2 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-md-t').setScale(0.2);
    repeatTileOnY(xPos, yPos, scene, 'tile-md-m', 3);
    // scene.add.image(xPos, yPos + 50, 'tile-md-m').setScale(0.2);
    // scene.add.image(xPos, yPos + 100, 'tile-md-m').setScale(0.2);
    // scene.add.image(xPos, yPos + 150, 'tile-md-m').setScale(0.2);
    scene.add.image(xPos, yPos + 200, 'tile-md-b').setScale(0.2);
  };

  const makeMdLand3 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-md-t').setScale(0.2);
    repeatTileOnY(xPos, yPos, scene, 'tile-md-m', 4);
    // scene.add.image(xPos, yPos + 50, 'tile-md-m').setScale(0.2);
    // scene.add.image(xPos, yPos + 100, 'tile-md-m').setScale(0.2);
    // scene.add.image(xPos, yPos + 150, 'tile-md-m').setScale(0.2);
    // scene.add.image(xPos, yPos + 200, 'tile-md-m').setScale(0.2);
    scene.add.image(xPos, yPos + 250, 'tile-md-b').setScale(0.2);
  };

  // ---------- LARGE Lands ----------
  const makeLgLand1 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-lg-tl').setScale(0.2);
    repeatTileOnX(xPos, yPos, scene, 'tile-lg-tm', 3);
    // scene.add.image(xPos + 50, yPos, 'tile-lg-tm').setScale(0.2);
    // scene.add.image(xPos + 100, yPos, 'tile-lg-tm').setScale(0.2);
    // scene.add.image(xPos + 150, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 200, yPos, 'tile-lg-tr').setScale(0.2);
    scene.add.image(xPos, yPos + 50, 'tile-lg-ml').setScale(0.2);
    repeatTileOnX(xPos, yPos + 50, scene, 'tile-lg-mm', 3);
    // scene.add.image(xPos + 50, yPos + 50, 'tile-lg-mm').setScale(0.2);
    // scene.add.image(xPos + 100, yPos + 50, 'tile-lg-mm').setScale(0.2);
    // scene.add.image(xPos + 150, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 50, 'tile-lg-mr').setScale(0.2);
    // 2nd middle layer
    scene.add.image(xPos, yPos + 100, 'tile-lg-ml').setScale(0.2);
    repeatTileOnX(xPos, yPos + 100, scene, 'tile-lg-mm', 3);
    // scene.add.image(xPos + 50, yPos + 100, 'tile-lg-mm').setScale(0.2);
    // scene.add.image(xPos + 100, yPos + 100, 'tile-lg-mm').setScale(0.2);
    // scene.add.image(xPos + 150, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 100, 'tile-lg-mr').setScale(0.2);
    scene.add.image(xPos, yPos + 150, 'tile-lg-bl').setScale(0.2);
    repeatTileOnX(xPos, yPos + 150, scene, 'tile-lg-bm', 3);
    // scene.add.image(xPos + 50, yPos + 150, 'tile-lg-bm').setScale(0.2);
    // scene.add.image(xPos + 100, yPos + 150, 'tile-lg-bm').setScale(0.2);
    // scene.add.image(xPos + 150, yPos + 150, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 150, 'tile-lg-br').setScale(0.2);
  };

  const makeLgLand2 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-lg-tl').setScale(0.2);
    scene.add.image(xPos + 50, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 100, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 150, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 200, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 250, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 300, yPos, 'tile-lg-tr').setScale(0.2);
    scene.add.image(xPos, yPos + 50, 'tile-lg-ml').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 50, 'tile-lg-mr').setScale(0.2);
    // 2nd middle layer
    scene.add.image(xPos, yPos + 100, 'tile-lg-ml').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 100, 'tile-lg-mr').setScale(0.2);
    // 3rd middle layer
    scene.add.image(xPos, yPos + 150, 'tile-lg-ml').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 150, 'tile-lg-mr').setScale(0.2);
    scene.add.image(xPos, yPos + 200, 'tile-lg-bl').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 200, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 200, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 200, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 200, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 200, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 200, 'tile-lg-br').setScale(0.2);
  };

  const makeLgLand3 = (xPos, yPos, scene) => {
    scene.add.image(xPos, yPos, 'tile-lg-tl').setScale(0.2);
    scene.add.image(xPos + 50, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 100, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 150, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 200, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 250, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 300, yPos, 'tile-lg-tm').setScale(0.2);
    scene.add.image(xPos + 350, yPos, 'tile-lg-tr').setScale(0.2);
    scene.add.image(xPos, yPos + 50, 'tile-lg-ml').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 50, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 350, yPos + 50, 'tile-lg-mr').setScale(0.2);
    // 2nd middle layer
    scene.add.image(xPos, yPos + 100, 'tile-lg-ml').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 100, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 350, yPos + 100, 'tile-lg-mr').setScale(0.2);
    // 3rd middle layer
    scene.add.image(xPos, yPos + 150, 'tile-lg-ml').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 150, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 350, yPos + 150, 'tile-lg-mr').setScale(0.2);
    // 4th middle layer
    scene.add.image(xPos, yPos + 200, 'tile-lg-ml').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 200, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 200, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 200, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 200, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 200, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 200, 'tile-lg-mm').setScale(0.2);
    scene.add.image(xPos + 350, yPos + 200, 'tile-lg-mr').setScale(0.2);
    scene.add.image(xPos, yPos + 250, 'tile-lg-bl').setScale(0.2);
    scene.add.image(xPos + 50, yPos + 250, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 100, yPos + 250, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 150, yPos + 250, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 200, yPos + 250, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 250, yPos + 250, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 300, yPos + 250, 'tile-lg-bm').setScale(0.2);
    scene.add.image(xPos + 350, yPos + 250, 'tile-lg-br').setScale(0.2);
  };

  return {
    makeFlatLand1,
    makeFlatLand2,
    makeFlatLand3,
    makeMdLand1,
    makeMdLand2,
    makeMdLand3,
    makeLgLand1,
    makeLgLand2,
    makeLgLand3,
  };
})();

export default GndCreate;