// Скрипт для поиска праздников по названию
// Предполагается, что массив `holidays` уже объявлен в app1.js и содержит объекты вида
// { date: "YYYY-MM-DD", name: "Название", country: "Страна", image?: "url" }
// Этот скрипт добавляет функциональность поиска праздника по части его названия.

(function() {
  // Подождём полной загрузки DOM и основного скрипта app1.js
  document.addEventListener('DOMContentLoaded', function() {
    // Проверяем наличие необходимых узлов
    const input = document.getElementById('holidaySearchInput');
    const searchBtn = document.getElementById('searchHolidayButton');
    const countryList = document.getElementById('countryList');
    const prevBtn = document.getElementById('prevHolidayButton');
    const nextBtn = document.getElementById('nextHolidayButton');

    if (!input || !searchBtn || !countryList) return;

    // Параметры пагинации
    const RESULTS_PER_PAGE = 10;
    let currentPage = 1;
    let currentResults = [];

    // Добавляем обработчики навигации
    prevBtn && prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
      }
    });

    nextBtn && nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(currentResults.length / RESULTS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
      }
    });

    // Основной обработчик поиска
    searchBtn.addEventListener('click', function() {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        alert('Пожалуйста, введите название праздника');
        return;
      }

      if (typeof holidays === 'undefined' || !Array.isArray(holidays)) {
        alert('Массив праздников не найден. Убедитесь, что app1.js загружен.');
        return;
      }

      // Фильтруем праздники по названию (частичное совпадение, нечувствительное к регистру)
      currentResults = holidays.filter(h => h.name.toLowerCase().includes(query));
      currentPage = 1;

      if (currentResults.length === 0) {
        alert('Праздники с таким названием не найдены');
        // Очищаем список и скрываем навигацию
        countryList.innerHTML = '';
        countryList.classList.remove('search-mode');
        toggleNavigation(false);
        return;
      }

      countryList.classList.add('search-mode');
      // Отображаем результаты
      renderPage();
    });

    // Функция для отображения текущей страницы результатов
    function renderPage() {
      countryList.style.display = 'block';
      countryList.innerHTML = '';

      const startIdx = (currentPage - 1) * RESULTS_PER_PAGE;
      const endIdx = startIdx + RESULTS_PER_PAGE;

      currentResults.slice(startIdx, endIdx).forEach(holiday => {
        const btn = document.createElement('button');
        btn.className = 'holiday-result-button primary-button';
        const dateObj = new Date(holiday.date);
        const formattedDate = dateObj.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        btn.innerHTML = `<span>${formattedDate} • ${holiday.name} (${holiday.country})</span>`;
        // При клике открываем модальное окно с деталями
        btn.addEventListener('click', () => showHolidayDetails(holiday));
        countryList.appendChild(btn);
      });

      // Обновляем кнопки навигации
      const totalPages = Math.ceil(currentResults.length / RESULTS_PER_PAGE);
      toggleNavigation(totalPages > 1);
      if (prevBtn) prevBtn.style.display = currentPage > 1 ? 'inline-block' : 'none';
      if (nextBtn) nextBtn.style.display = currentPage < totalPages ? 'inline-block' : 'none';
    }

    // Показываем/скрываем блок навигации
    function toggleNavigation(show) {
      if (!prevBtn || !nextBtn) return;
      prevBtn.style.display = nextBtn.style.display = show ? 'inline-block' : 'none';
    }

    /**
     * Открывает модальное окно и заполняет его данными о празднике
     * @param {{date:string, name:string, country:string, image?:string, description?:string}} holiday 
     */
    function showHolidayDetails(holiday) {
      const modal = document.getElementById('modal');
      if (!modal) return;

      const imgEl = document.getElementById('holidayImage');
      const titleEl = document.getElementById('countryTitle');
      const descEl = document.getElementById('holidayDescription');
      const detailsEl = document.getElementById('holidayDetails');

      // Получаем дополнительные данные, если они существуют в holidayDescriptions
      let extra = {};
      if (typeof holidayDescriptions !== 'undefined' && holidayDescriptions[holiday.name]) {
        extra = holidayDescriptions[holiday.name];
      }

      // Заполняем данные
      if (imgEl) {
        imgEl.src = extra.image || holiday.image || '';
        imgEl.alt = holiday.name;
        imgEl.classList.add('mini');
      }
      if (titleEl) {
        titleEl.textContent = `${holiday.name} — ${holiday.country}`;
      }
      if (descEl) {
        descEl.textContent = extra.description || '';
      }
      if (detailsEl) {
        const formattedDate = new Date(holiday.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        detailsEl.textContent = `Дата: ${formattedDate}`;
      }

      // Показываем модальное окно
      modal.style.display = 'block';
    }

    // Делаем функцию глобальной, чтобы ею можно было пользоваться из других скриптов
    window.showHolidayDetails = showHolidayDetails;

    // Дополнительный делегированный обработчик, чтобы добавить дату в модальном окне
    document.addEventListener('click', function(event) {
      const btn = event.target.closest('#countryList button');
      if (!btn) return;

      // Если showHolidayDetails уже сработал – ничего не делаем
      const detailsEl = document.getElementById('holidayDetails');
      if (!detailsEl) return;
      if (detailsEl.textContent && /Дата:\s*\d{2}\.\d{2}/.test(detailsEl.textContent)) return;

      // Пытаемся извлечь дату ДД.ММ из текста кнопки
      const match = btn.textContent.match(/(\d{1,2}[\.\/]\d{1,2})/);
      if (match) {
        const datePart = match[1].replace('/', '.');
        detailsEl.textContent = `Дата: ${datePart.padStart(5, '0')}`;
      }
    });
  });
})();