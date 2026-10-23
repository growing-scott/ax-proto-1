// 룰렛 로직. 브라우저(window.Roulette)와 Node(require) 양쪽에서 쓴다.
(function (root) {
  // n칸 중 하나를 균등하게 뽑는다.
  function spin(n, rng = Math.random) {
    if (!Number.isInteger(n) || n < 2) throw new Error('항목은 2개 이상');
    return Math.floor(rng() * n);
  }

  // 칸 0이 맨 위에서 시계방향으로 놓인 바퀴를 turns 바퀴 돌려
  // 칸 i 의 중앙이 맨 위 화살표에 오게 하는 회전각(도).
  function targetAngle(i, n, turns) {
    return turns * 360 - (i + 0.5) * 360 / n;
  }

  const api = { spin, targetAngle };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Roulette = api;
})(this);
