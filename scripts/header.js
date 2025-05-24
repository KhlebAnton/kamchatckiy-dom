// поиск
const btnSearchMobile = document.querySelector('.btn_search');
const searchWrapper = document.querySelector('.search-wrapper');

const searchInput = document.getElementById('search-input');
const searchReset = document.getElementById('search-reset');
const searchBtn = document.getElementById('search-btn');
const searchLabel = document.querySelector('.label_search');
btnSearchMobile.addEventListener('click', () => {
    searchWrapper.classList.add('open');
    toggleScroll(false)
});

document.addEventListener('click', (e) => {
    if (!searchLabel.contains(e.target) && !btnSearchMobile.contains(e.target) && searchWrapper.classList.contains('open')) {
        searchWrapper.classList.remove('open');
        toggleScroll(true);
    }
})

// Список товаров для placeholder
const placeholderTexts = [
    "Свежемороженая рыба",
    "Икра нерки"
];

let currentPlaceholderIndex = 0;
let typingInterval;
let deletingInterval;
let currentAction = null;

function typePlaceholder(text, callback) {
    let i = 0;
    searchInput.placeholder = "";

    clearIntervals();
    currentAction = 'typing';

    typingInterval = setInterval(() => {
        if (i < text.length) {
            searchInput.placeholder += text[i];
            i++;
        } else {
            clearInterval(typingInterval);
            setTimeout(callback, 1500);
        }
    }, 100);
}

function deletePlaceholder(callback) {
    let text = searchInput.placeholder;
    let i = text.length;

    clearIntervals();
    currentAction = 'deleting';

    deletingInterval = setInterval(() => {
        if (i > 0) {
            searchInput.placeholder = text.substring(0, i - 1);
            i--;
        } else {
            clearInterval(deletingInterval);
            setTimeout(callback, 500);
        }
    }, 50);
}

function clearIntervals() {
    clearInterval(typingInterval);
    clearInterval(deletingInterval);
}

function animatePlaceholder() {
    if (currentAction) return;

    const text = placeholderTexts[currentPlaceholderIndex];

    typePlaceholder(text, () => {
        deletePlaceholder(() => {
            currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholderTexts.length;
            currentAction = null;
            animatePlaceholder();
        });
    });
}

function startAnimation() {
    if (searchInput.value === "" && document.activeElement !== searchInput) {
        animatePlaceholder();
    }
}

function stopAnimation() {
    clearIntervals();
    currentAction = null;
}

startAnimation();
const searchContent = document.querySelector('.search-content')

searchInput.addEventListener('focus', () => {
    stopAnimation();
    searchInput.placeholder = "Найти";
    searchContent.classList.add('open')
});

searchInput.addEventListener('blur', () => {
    startAnimation();
    // searchContent.classList.remove('open')
});
document.addEventListener('click', (e) => {
    if (!searchContent.contains(e.target) && !searchLabel.contains(e.target)) {
        searchContent.classList.remove('open')
    }

})
searchInput.addEventListener('input', function () {
    if (this.value.length > 0) {
        searchReset.classList.add('active');
    } else {
        searchReset.classList.remove('active');
    }
});

searchReset.addEventListener('click', function () {
    searchInput.value = '';
    searchInput.focus();
    this.classList.remove('active');
    searchInput.placeholder = "Найти";
});
searchBtn.addEventListener('click', function () {

    searchInput.focus();

});

// dropdown

const navDropdownItem = document.querySelector('.nav_item_dropdown');

navDropdownItem.addEventListener('click', () => {
    navDropdownItem.classList.toggle('open')
});

document.addEventListener('click', (e) => {
    if (!navDropdownItem.contains(e.target) && navDropdownItem.classList.contains('open')) {
        navDropdownItem.classList.remove('open')
    }
});

// catalog header
const catlogCategories = document.querySelectorAll('.header__catalog-category__item');
const catlogCategoriesContent = document.querySelectorAll('.category__content');

catlogCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        catlogCategories.forEach(item => {
            item.classList.remove('active');
        });
        category.classList.add('active');
        updateCategoriesContent(category.getAttribute('data-category'))

    });
});
function updateCategoriesContent(categories) {
    catlogCategoriesContent.forEach(content => {
        content.classList.remove('open')
    });
    if (categories) {

        catlogCategoriesContent.forEach(content => {
            if (content.getAttribute('data-category').toLowerCase() === categories.toLowerCase()) {
                content.classList.add('open')
            }
        });
    } else {
        catlogCategoriesContent.forEach(content => {
            if (content.getAttribute('data-category') === 'База') {
                catlogCategories.forEach(item => {
                    item.classList.remove('active');
                });
                content.classList.add('open')
            }
        });
    }
}


// header catalog
const btnCatalog = document.querySelector('.btn_catalog');
const headerCatalog = document.querySelector('.header__catalog');
btnCatalog.addEventListener('click', () => {
    btnCatalog.classList.toggle('active');
    headerCatalog.classList.toggle('open');
    if (headerCatalog.classList.contains('open')) {
        updateCategoriesContent();
        toggleScroll(false)
    } else {
        toggleScroll(true)
    }
})


// scroll

function toggleScroll(enable) {
    if (enable) {
        document.documentElement.classList.remove('no-scrolled');
        document.body.classList.remove('no-scrolled');
    } else {
        document.documentElement.classList.add('no-scrolled');
        document.body.classList.add('no-scrolled');
    }
};

// menu
const btnMenu = document.querySelector('.btn-menu');
const headerMenu = document.querySelector('.header__menu');


btnMenu.addEventListener('click', () => {
    closeAllMenu()

});
function closeAllMenu() {
    btnMenu.classList.toggle('active');
    headerMenu.classList.toggle('open');
    if (headerMenu.classList.contains('open')) {
        toggleScroll(false)
    } else {
        toggleScroll(true);
        catalogMobileContent.classList.remove('open');
        subcategoryMenu.classList.remove('open')
    }

}
const btnCatalogMobile = document.querySelector('.btn_catalog_mobile');
const catalogMobileContent = document.querySelector('.header__category_mobile');
const btnBackCategory = catalogMobileContent.querySelector('.btn_prev_category');

btnBackCategory.addEventListener('click', () => {
    catalogMobileContent.classList.remove('open')
})

btnCatalogMobile.addEventListener('click', () => {
    catalogMobileContent.classList.add('open')
});

// subvategory
const subcategoryMenu = document.querySelector('.header__subcategory_mobile');
const categoryMobilItems = document.querySelectorAll('.header__catalog-category_mobile__item[data-category]');
const categoryContentMobile = document.querySelectorAll('.category__content_mobile');

const btnBackSubcategory = subcategoryMenu.querySelector('.btn_prev_subcategory');

categoryMobilItems.forEach(sub => {
    sub.addEventListener('click', () => {
        let categ = sub.getAttribute('data-category');
        categoryContentMobile.forEach(cont => cont.classList.remove('open'));
        categoryContentMobile.forEach(cont => {
            if (cont.getAttribute('data-category').toLowerCase() === categ.toLowerCase()) {
                cont.classList.add('open')
            };
        });
        subcategoryMenu.classList.add('open')
    })
});
btnBackSubcategory.addEventListener('click', () => {
    subcategoryMenu.classList.remove('open')
})


// basket
const basketContainer = document.querySelector('.basket__content');

// Обработчик для всего контейнера корзины (делегирование событий)
basketContainer.addEventListener('click', function (e) {
    const target = e.target;

    // Обработка кнопки "+"
    if (target.classList.contains('product_counter__plus')) {
        const counter = target.closest('.prouct_counter').querySelector('.product_counter__count');
        counter.textContent = parseInt(counter.textContent) + 1;

    }

    // Обработка кнопки "-"
    if (target.classList.contains('product_counter__minus')) {
        const counter = target.closest('.prouct_counter').querySelector('.product_counter__count');
        const currentValue = parseInt(counter.textContent);

        if (currentValue > 1) {
            counter.textContent = currentValue - 1;

        }
    }
});

// Функция для определения ширины скроллбара
function getScrollbarWidth() {
    // Создаем временный элемент для измерения
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // Принудительно показываем скролл
    document.body.appendChild(outer);

    // Создаем внутренний элемент
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Вычисляем разницу в ширине
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Удаляем временные элементы
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

// Получаем ширину скроллбара
const scrollbarWidth = getScrollbarWidth();
document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

document.addEventListener('DOMContentLoaded', () => {
    startAnimation();
    updateCategoriesContent()
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? '+7' : `+7(${x[2]}${x[3] ? `)-${x[3]}` : ''}${x[4] ? `-${x[4]}` : ''}${x[5] ? `-${x[5]}` : ''}`;
    });
});

const inputsAll = document.querySelectorAll('input:not(#search-input)');

inputsAll.forEach(input => {
    const updateFilledState = () => {
      input.classList.toggle('filled', input.value.trim().length > 0);
    };
    input.addEventListener('change',updateFilledState)
    updateFilledState()
})
    