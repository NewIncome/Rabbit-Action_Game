const GameLogic = (() => {
  let phase;
  let time;
  let endStat;

  const gameCycle = (cycle, enemy1, enemy2, boss, enemycount, phaseTx) => {
    new Promise((resolve) => {
      if (cycle === 0) {
        phase = 1;
        phaseTx.text = 'Phase: 1';
        time = new Date();

        return phase;
      }
      return resolve('success');
    })
      .then(() => {
        setTimeout(() => {
          if (enemy1.countActive() === 0 && cycle === 1) {
            phase = 2;
            phaseTx.text = 'Phase: 2';
            setTimeout(() => {
              enemy2.children.iterate((child) => {
                child.active = true;
                child.visible = true;
                child.body.checkCollision.up = true;
              });
            }, 1000);
          }
          return phase;
        }, 1500);
      })
      .then(() => {
        setTimeout(() => {
          if (enemy2.countActive() === 0 && cycle === 2) {
            phase = 3;
            phaseTx.text = 'Phase: Final';
            boss.active = true;
            boss.visible = true;
            boss.body.checkCollision.up = true;
            boss.body.checkCollision.left = true;
            boss.body.checkCollision.right = true;
            return phase;
          }
          return phase;
        }, 1500);
      })
      .catch(() => phase);

    return phase;
  };

  const koTime = () => {
    const tm = new Date() - time;
    return (tm / 1000).toFixed(2);
  };

  return {
    phase,
    gameCycle,
    time,
    koTime,
    endStat,
  };
})();

export default GameLogic;