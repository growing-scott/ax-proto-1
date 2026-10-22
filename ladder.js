// 사다리 로직. 브라우저(window.Ladder)와 Node(require) 양쪽에서 쓴다.
(function (root) {
  // rows 개의 행마다 가로줄 목록(왼쪽 세로줄 인덱스, 오름차순)을 만든다.
  // 같은 행에서 인접한 가로줄은 세로줄을 공유하므로 간격 2 이상만 허용한다.
  function generateLadder(n, rows, rng = Math.random) {
    if (!Number.isInteger(n) || n < 2) throw new Error('참가자는 2명 이상');
    return Array.from({ length: rows }, () => {
      const row = [];
      for (let c = 0; c < n - 1; c++) {
        if (rng() < 0.5) { row.push(c); c++; }
      }
      return row;
    });
  }

  // 시작 칸 i -> 도착 칸 result[i]
  function walk(ladder, n) {
    return Array.from({ length: n }, (_, start) => {
      let pos = start;
      for (const row of ladder) {
        if (row.includes(pos)) pos++;
        else if (row.includes(pos - 1)) pos--;
      }
      return pos;
    });
  }

  const api = { generateLadder, walk };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Ladder = api;
})(this);
