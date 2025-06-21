document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myCustomModal');
    const btn = document.getElementById('instructionBtn');
    const closeBtn = document.querySelector('.close');
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.instruction-section');
    const modalContent = document.querySelector('#myCustomModal .modal-content');

    // Показ модального окна
    btn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });

    // Навигация по секциям
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Обновляем активную кнопку
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем нужную секцию
            sections.forEach(section => {
                if (section.id === `${targetSection}-section`) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Анимация при наведении на карточки
    const cards = document.querySelectorAll('.feature-card, .info-card, .tip-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Показываем первую секцию при открытии
    sections[0].style.display = 'block';
    navBtns[0].classList.add('active');

    // 3D tilt effect disabled
}); 