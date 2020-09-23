const GndCreate = (() => {
  const topTiles = ['tile-flat-l', 'tile-flat-m', 'tile-flat-r',
    'tile-md-t', 'tile-lg-tl', 'tile-lg-tm', 'tile-lg-tr'];

  // helper functions to minimize code
  const repeatTileOnX = (x, y, scene, statGrp, tile, n) => {
    for (let i = 50; i <= n * 50; i += 50) {
      if (topTiles.includes(tile)) statGrp.create(x + i, y, tile);
      else scene.add.image(x + i, y, tile);
    }
  };

  const repeatTileOnY = (x, y, scene, statGrp, tile, n) => {
    for (let i = 50; i <= n * 50; i += 50) {
      if (topTiles.includes(tile)) statGrp.create(x, y + i, tile);
      else scene.add.image(x, y + i, tile);
    }
  };

  const layerXextRepeater = (x, y, scene, statGrp, tTile, mTile, bTile, landSize, n) => {
    for (let i = 0; i < (n * 50); i += 50) {
      if (topTiles.includes(tTile)) statGrp.create(x, y, tTile);
      else scene.add.image(x, y, tTile);
      repeatTileOnY(x, y, scene, statGrp, mTile, landSize);
      scene.add.image(x, y + ((landSize + 1) * 50), bTile);
    }
  };

  const layerYextRepeater = (x, y, scene, statGrp, lTile, mTile, rTile, landSize, n) => {
    for (let i = 0; i < (n * 50); i += 50) {
      if (topTiles.includes(lTile)) statGrp.create(x, y, lTile);
      else scene.add.image(x, y + i, lTile);
      repeatTileOnX(x, y + i, scene, statGrp, mTile, landSize);
      if (topTiles.includes(rTile)) statGrp.create(x + ((landSize + 1) * 50), y + i, rTile);
      else scene.add.image(x + ((landSize + 1) * 50), y + i, rTile);
    }
  };

  // ---------- FLAT Lands ----------
  const makeFlatLand = (xPos, yPos, scene, staticGroup, size) => {
    layerYextRepeater(xPos, yPos, scene, staticGroup, 'tile-flat-l', 'tile-flat-m', 'tile-flat-r', size, 1);
  };

  // ---------- MEDIUM Lands ----------
  const makeMdLand = (xPos, yPos, scene, staticGroup, size) => {
    layerXextRepeater(xPos, yPos, scene, staticGroup, 'tile-md-t', 'tile-md-m', 'tile-md-b', size, 1);
  };

  // ---------- LARGE Lands ----------
  const makeLgLand1 = (xPos, yPos, scene, staticGroup, size = 3) => {
    layerYextRepeater(xPos, yPos, scene, staticGroup, 'tile-lg-tl', 'tile-lg-tm', 'tile-lg-tr', size, 1);

    layerYextRepeater(xPos, yPos + 50, scene, staticGroup, 'tile-lg-ml', 'tile-lg-mm', 'tile-lg-mr', size, 2);

    layerYextRepeater(xPos, yPos + 150, scene, staticGroup, 'tile-lg-bl', 'tile-lg-bm', 'tile-lg-br', size, 1);
  };

  const makeLgLand2 = (xPos, yPos, scene, staticGroup, size = 5) => {
    layerYextRepeater(xPos, yPos, scene, staticGroup, 'tile-lg-tl', 'tile-lg-tm', 'tile-lg-tr', size, 1);

    layerYextRepeater(xPos, yPos + 50, scene, staticGroup, 'tile-lg-ml', 'tile-lg-mm', 'tile-lg-mr', size, 3);

    layerYextRepeater(xPos, yPos + 200, scene, staticGroup, 'tile-lg-bl', 'tile-lg-bm', 'tile-lg-br', size, 1);
  };

  const makeLgLand3 = (xPos, yPos, scene, staticGroup, size = 7) => {
    layerYextRepeater(xPos, yPos, scene, staticGroup, 'tile-lg-tl', 'tile-lg-tm', 'tile-lg-tr', size, 1);

    layerYextRepeater(xPos, yPos + 50, scene, staticGroup, 'tile-lg-ml', 'tile-lg-mm', 'tile-lg-mr', size, 4);

    layerYextRepeater(xPos, yPos + 250, scene, staticGroup, 'tile-lg-bl', 'tile-lg-bm', 'tile-lg-br', size, 1);
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