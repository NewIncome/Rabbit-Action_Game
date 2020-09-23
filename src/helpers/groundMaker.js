const GndCreate = (() => {
  // helper functions to minimize code
  const repeatTileOnX = (x, y, scene, tile, n) => {
    for (let i = 50; i <= n * 50; i += 50) {
      scene.create(x + i, y, tile);
    }
  };

  const repeatTileOnY = (x, y, scene, tile, n) => {
    for (let i = 50; i <= n * 50; i += 50) {
      scene.create(x, y + i, tile);
    }
  };

  const layerXextRepeater = (x, y, scene, tTile, mTile, bTile, landSize, n) => {
    for (let i = 0; i < (n * 50); i += 50) {
      scene.create(x, y, tTile);
      repeatTileOnY(x, y, scene, mTile, landSize);
      scene.create(x, y + ((landSize + 1) * 50), bTile);
    }
  };

  const layerYextRepeater = (x, y, scene, lTile, mTile, rTile, landSize, n) => {
    for (let i = 0; i < (n * 50); i += 50) {
      scene.create(x, y + i, lTile);
      repeatTileOnX(x, y + i, scene, mTile, landSize);
      scene.create(x + ((landSize + 1) * 50), y + i, rTile);
    }
  };

  // ---------- FLAT Lands ----------
  const makeFlatLand = (xPos, yPos, scene, size) => {
    layerYextRepeater(xPos, yPos, scene, 'tile-flat-l', 'tile-flat-m', 'tile-flat-r', size, 1);
  };

  // ---------- MEDIUM Lands ----------
  const makeMdLand = (xPos, yPos, scene, size) => {
    layerXextRepeater(xPos, yPos, scene, 'tile-md-t', 'tile-md-m', 'tile-md-b', size, 1);
  };

  // ---------- LARGE Lands ----------
  const makeLgLand1 = (xPos, yPos, scene, size = 3) => {
    layerYextRepeater(xPos, yPos, scene, 'tile-lg-tl', 'tile-lg-tm', 'tile-lg-tr', size, 1);

    layerYextRepeater(xPos, yPos + 50, scene, 'tile-lg-ml', 'tile-lg-mm', 'tile-lg-mr', size, 2);

    layerYextRepeater(xPos, yPos + 150, scene, 'tile-lg-bl', 'tile-lg-bm', 'tile-lg-br', size, 1);
  };

  const makeLgLand2 = (xPos, yPos, scene, size = 5) => {
    layerYextRepeater(xPos, yPos, scene, 'tile-lg-tl', 'tile-lg-tm', 'tile-lg-tr', size, 1);

    layerYextRepeater(xPos, yPos + 50, scene, 'tile-lg-ml', 'tile-lg-mm', 'tile-lg-mr', size, 3);

    layerYextRepeater(xPos, yPos + 200, scene, 'tile-lg-bl', 'tile-lg-bm', 'tile-lg-br', size, 1);
  };

  const makeLgLand3 = (xPos, yPos, scene, size = 7) => {
    layerYextRepeater(xPos, yPos, scene, 'tile-lg-tl', 'tile-lg-tm', 'tile-lg-tr', size, 1);

    layerYextRepeater(xPos, yPos + 50, scene, 'tile-lg-ml', 'tile-lg-mm', 'tile-lg-mr', size, 4);

    layerYextRepeater(xPos, yPos + 250, scene, 'tile-lg-bl', 'tile-lg-bm', 'tile-lg-br', size, 1);
  };

  return {
    makeFlatLand,
    makeMdLand,
    makeLgLand1,
    makeLgLand2,
    makeLgLand3,
  };
})();

export default GndCreate;