// Calendar functionality
const calendarContainer = document.querySelector('.calendar');
const daysContainer = document.getElementById('days');
const monthYear = document.querySelector('.month-year');
let currentDate = new Date();

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().slice(0, 10);

function renderCalendar() {
    currentDate.setDate(1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1; // Adjust for Monday start
    const lastDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay() === 0 ? 6 : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay() - 1;

    // Clear previous content
    daysContainer.innerHTML = '';

    // Add empty cells for days before first day of month
    for (let x = firstDayIndex; x > 0; x--) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysContainer.appendChild(emptyDay);
    }

    // Add days
    for (let i = 1; i <= lastDay; i++) {
        const fullDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isToday = fullDate === today;
        
        const dayElement = document.createElement('div');
        dayElement.className = `day ${isToday ? 'today' : ''}`;
        dayElement.setAttribute('data-date', fullDate);
        dayElement.textContent = i;
        
        dayElement.addEventListener('click', function() {
            const date = this.getAttribute('data-date');
            if (date) {
                showHolidays(date);
            }
        });
        
        daysContainer.appendChild(dayElement);
    }

    // Add empty cells for remaining days
    for (let j = lastDayIndex; j < 6; j++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysContainer.appendChild(emptyDay);
    }

    // Update month and year
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                       'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

function showHolidays(date) {
    const monthDay = date.slice(5); // 'MM-DD'
    const selectedYear = date.slice(0, 4); // 'YYYY'

    // Filter holidays for this date
    const holidayList = holidays.filter(holiday => holiday.date.slice(5) === monthDay);
    
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';
    
    if (holidayList.length > 0) {
        holidayList.forEach(holiday => {
            const holidayItem = document.createElement('div');
            holidayItem.className = 'holiday-item';
            
            const holidayContent = document.createElement('div');
            holidayContent.className = 'holiday-content';
            
            const holidayDate = document.createElement('div');
            holidayDate.className = 'holiday-date';
            holidayDate.textContent = `${selectedYear}-${holiday.date.slice(5)}`;
            
            const holidayName = document.createElement('div');
            holidayName.className = 'holiday-name';
            holidayName.textContent = holiday.name;
            
            const holidayCountry = document.createElement('div');
            holidayCountry.className = 'holiday-country';
            holidayCountry.textContent = holiday.country;
            
            holidayContent.appendChild(holidayDate);
            holidayContent.appendChild(holidayName);
            holidayContent.appendChild(holidayCountry);
            holidayItem.appendChild(holidayContent);
            modalBody.appendChild(holidayItem);
        });
    } else {
        const noHolidays = document.createElement('div');
        noHolidays.className = 'holiday-item';
        noHolidays.textContent = 'На эту дату праздников нет';
        modalBody.appendChild(noHolidays);
    }
    
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Navigation for months
document.querySelector('.prev-month').addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.querySelector('.next-month').addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Close modal on close button click
document.querySelector('.close-button').addEventListener('click', function () {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize calendar
renderCalendar(); 