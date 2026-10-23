const test = require('node:test');
const assert = require('node:assert');
const { spin, targetAngle } = require('./roulette.js');

test('rng 값에 따라 균등하게 칸을 고른다', () => {
  assert.strictEqual(spin(4, () => 0), 0);
  assert.strictEqual(spin(4, () => 0.26), 1);
  assert.strictEqual(spin(4, () => 0.999), 3);
});

test('항목이 2개 미만이면 에러', () => {
  assert.throws(() => spin(1));
});

test('모든 칸이 뽑힐 수 있다', () => {
  const seen = new Set();
  for (let t = 0; t < 500; t++) seen.add(spin(5));
  assert.deepStrictEqual([...seen].sort(), [0, 1, 2, 3, 4]);
});

test('targetAngle: 바퀴를 돌린 뒤 뽑힌 칸의 중앙이 맨 위 화살표에 온다', () => {
  for (let n = 2; n <= 8; n++) {
    for (let i = 0; i < n; i++) {
      const rot = targetAngle(i, n, 5);
      assert.ok(rot >= 5 * 360 - 360 && rot < 5 * 360);
      const under = (((-rot) % 360) + 360) % 360; // 화살표 밑 바퀴 각도
      assert.ok(Math.abs(under - (i + 0.5) * 360 / n) < 1e-9);
    }
  }
});
