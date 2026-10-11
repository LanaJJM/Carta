import confetti from 'canvas-confetti';

export function fireBirthdayConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#fb7185', '#fbbf24', '#38bdf8', '#a855f7'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ec4899', '#f59e0b', '#10b981', '#6366f1'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffd700', '#ff69b4', '#00e5ff', '#ff3366'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireFireworks() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = window.setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.15, 0.4), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#c084fc', '#4ade80'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.85), y: Math.random() - 0.2 },
      colors: ['#ec4899', '#f59e0b', '#06b6d4', '#e879f9', '#facc15'],
    });
  }, 300);
}

export function fireHearts() {
  confetti({
    particleCount: 45,
    spread: 70,
    origin: { y: 0.6 },
    shapes: ['circle'],
    colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
    scalar: 1.4,
    zIndex: 9999,
  });
}

export function fireStars() {
  confetti({
    particleCount: 60,
    spread: 90,
    origin: { y: 0.65 },
    shapes: ['star'],
    colors: ['#ffd700', '#facc15', '#fef08a', '#ffffff'],
    scalar: 1.2,
    zIndex: 9999,
  });
}
