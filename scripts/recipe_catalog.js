const dropdowns = document.querySelectorAll('.sort-dropdown');

dropdowns.forEach(dropdown => {
    const dropdownBtn = dropdown.querySelector('.sort-dropdown-btn');
    const dropdownItems = dropdown.querySelectorAll('.sort-dropdown__item');

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Закрываем все другие открытые dropdown перед открытием текущего
            document.querySelectorAll('.sort-dropdown.open').forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('open');
                }
            });
            dropdown.classList.toggle('open');
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                dropdownBtn.textContent = this.textContent;
                dropdown.classList.remove('open');
            });
        });
    }
});

// Закрываем dropdown при клике вне его области
document.addEventListener('click', function(e) {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});