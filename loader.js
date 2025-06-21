// Логика сложной праздничной загрузки
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Убедимся, что лоадер отображается (вдруг его скрыла другая логика)
  loader.style.display = 'flex';

  const progressFill = document.querySelector('.progress-fill');
  const confettiContainer = document.querySelector('.confetti-container');
  const holidayElements = document.querySelector('.holiday-elements');

  // Безопасные проверки
  if (!progressFill || !confettiContainer || !holidayElements) return;

  // Создание конфетти
  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }

  // Создание фейерверков
  function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + '%';
    firework.style.top = Math.random() * 100 + '%';
    firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    holidayElements.appendChild(firework);
    setTimeout(() => firework.remove(), 2000);
  }

  const confettiInterval = setInterval(createConfetti, 120);
  const fireworkInterval = setInterval(createFirework, 350);

  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 1;
    progressFill.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);
      clearInterval(confettiInterval);
      clearInterval(fireworkInterval);

      setTimeout(() => {
        loader.classList.add('hidden');
        // Показываем основной контент
        const header = document.querySelector('.top-line');
        const slider = document.querySelector('.slider');
        header && header.classList.remove('hidden');
        slider && slider.classList.remove('hidden');
      }, 600);
    }
  }, 30);
}); 