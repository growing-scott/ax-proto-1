const test = require('node:test');
const assert = require('node:assert');
const { generateLadder, walk, path } = require('./ladder.js');

for (let n = 2; n <= 10; n++) {
  test(`n=${n}: 가로줄이 같은 행에서 겹치지 않는다`, () => {
    for (let t = 0; t < 50; t++) {
      for (const row of generateLadder(n, 12)) {
        row.forEach((c, k) => {
          assert.ok(c >= 0 && c < n - 1);
          if (k) assert.ok(c - row[k - 1] >= 2, `인접 가로줄 ${row}`);
        });
      }
    }
  });

  test(`n=${n}: 결과가 참가자와 1:1 대응한다`, () => {
    for (let t = 0; t < 50; t++) {
      const res = walk(generateLadder(n, 12), n);
      assert.deepStrictEqual([...res].sort((a, b) => a - b), [...Array(n).keys()]);
    }
  });
}

test('가로줄 하나면 두 칸이 서로 바뀐다', () => {
  assert.deepStrictEqual(walk([[0]], 3), [1, 0, 2]);
});

test('path: 행마다 지나는 칸을 돌려주고 walk 와 끝이 같다', () => {
  assert.deepStrictEqual(path([[0]], 3, 0), [0, 1]);
  assert.deepStrictEqual(path([[0]], 3, 2), [2, 2]);
  for (let n = 2; n <= 10; n++) {
    const ladder = generateLadder(n, 12), res = walk(ladder, n);
    for (let s = 0; s < n; s++) {
      const p = path(ladder, n, s);
      assert.strictEqual(p.length, 13);
      assert.strictEqual(p[0], s);
      assert.strictEqual(p[12], res[s]);
    }
  }
});

test('참가자가 2명 미만이면 에러', () => {
  assert.throws(() => generateLadder(1, 5));
});
