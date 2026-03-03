const animationEl = document.querySelector('.animation');

function jumpDino() {
  if (!animationEl) {
    return;
  }

  animationEl.classList.remove('jump');
  void animationEl.offsetWidth;
  animationEl.classList.add('jump');
}

function isInteractiveTarget(target) {
  return Boolean(target?.closest('a, button, input, select, textarea, [role="button"]'));
}

function handleJumpTrigger(event) {
  if (isInteractiveTarget(event.target)) {
    return;
  }

  jumpDino();
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    handleJumpTrigger(event);
  }
});

if (window.PointerEvent) {
  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      handleJumpTrigger(event);
    }
  });
} else {
  document.addEventListener('touchstart', handleJumpTrigger, { passive: true });
}