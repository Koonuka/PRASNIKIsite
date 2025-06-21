document.addEventListener('DOMContentLoaded', function() {
    const holidayImage = document.getElementById('holidayImage');
    
    if (holidayImage) {
        holidayImage.addEventListener('click', function() {
            this.classList.toggle('mini');
        });
    }
}); 