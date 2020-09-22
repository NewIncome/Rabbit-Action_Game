const tileLoader = (scene,
  name,
  term,
  directory,
  numStart,
  qnt,
  ext) => {
  for (let i = 0; i < qnt; i += 1) {
    scene.load.image(`${name + term[i]}`, `${directory}${numStart + i}${ext}`);
  }
};

export default tileLoader;