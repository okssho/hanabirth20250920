// キャンバス準備
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

// リサイズ対応
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
resize();

// 花火パーティクルクラス
class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.velX = (Math.random() - 0.5) * 6;
    this.velY = (Math.random() - 0.5) * 6;
    this.alpha = 1;
    this.color = color;
  }
  update() {
    this.x += this.velX;
    this.y += this.velY;
    this.alpha -= 0.02;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

let fireworks = [];

// 打ち上げ花火を生成
function launch() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2; // 上半分に発生
  const color = `hsl(${Math.random() * 360},100%,60%)`;
  for (let i = 0; i < 30; i++) {
    fireworks.push(new Firework(x, y, color));
  }
  const x1 = Math.random() * canvas.width;
  const y1 = Math.random() * canvas.height / 2; // 上半分に発生
  const color1 = `hsl(${Math.random() * 360},100%,60%)`;
  for (let i = 0; i < 30; i++) {
    fireworks.push(new Firework(x1, y1, color1));
  }
}

// 描画ループ
function animate() {
  // 残像を残す黒背景
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.alpha <= 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

// 定期的に打ち上げ
setInterval(launch, 800);
animate();

// window.addEventListener('load', () => {
//     const heartBtn = document.getElementById('heartBtn');

//     // 5秒後にボタンを表示
//     setTimeout(() => {
//       heartBtn.classList.add('show');
//     }, 5000);

//     // ボタンがクリックされたときの処理
//     heartBtn.addEventListener('click', () => {
//       alert('ボタンがクリックされました！');
//       // ここにモーダル表示の処理などを書ける
//     });
//   });

  window.addEventListener('load', () => {
  const heartBtn = document.getElementById('heartBtn');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close');
  const letter = document.getElementById('letter');

  // 5秒後にハートボタンを表示
  setTimeout(() => {
    heartBtn.classList.add('show');
  }, 6500);

  // タイプライター関数
  function typeWriter(text, element, speed = 50) {
    element.textContent = ''; // 一旦空に
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // ハートボタンを押したらモーダルを開いてタイプライター開始
  heartBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    const message = '付き合ってくれてありがとう！これからもよろしく！！'; // 手紙の本文
    typeWriter(message, letter, 80); // speed=80msごとに1文字
  });

  // ×ボタンを押したら閉じる
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // 背景クリックでも閉じる
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});