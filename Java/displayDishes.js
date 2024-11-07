document.addEventListener("DOMContentLoaded", () => {
    const lunchCombos = [ // Возможный комбинации блюд для заказа
        ["soup", "main", "salat", "drink"],
        ["soup", "main", "drink"],
        ["soup", "salat", "drink"],
        ["main", "salat", "drink"],
        ["main", "drink"]
    ];

    // Находим форму на странице и добавляем обработчик события на её отправку
    const form = document.querySelector("form"); 
    form.addEventListener("submit", (event) => {
        event.preventDefault();// Предотвращаем стандартное поведение отправки формы

        // Проверяем состав заказа
        if (!checkLunchComposition()) {
            return;
        }

        form.submit();// Если проверка прошла, отправляем форму
    });

// Функция для проверки состава заказа
    const checkLunchComposition = () => {
        let selectedCategories = Object.keys(selectedDishes).filter(category => selectedDishes[category]); // Извлекаем все категории блюд и фильтруем только те, которые выбраны
        let isValidCombo = lunchCombos.some(combo => combo.every(item => selectedCategories.includes(item))); // Проверяем, соответствует ли комбинация блюд одной из допустимых
        
        // Проверка различных условий и вывод соответствующих сообщений
        if (selectedCategories.length === 0) {
            showAlert("Ничего не выбрано. Выберите блюда для заказа");
            return false;
        } else if (selectedCategories.includes("desert") && selectedCategories.length === 1) {
            showAlert("Выберите главное блюдо");
            return false;
        } else if (selectedCategories.includes("main") && selectedCategories.includes("salat") && !selectedCategories.includes("drink") && selectedCategories.includes("soup") && selectedCategories.includes("desert")) {
            showAlert("Выберите напиток");
            return false;
        } else if (selectedCategories.includes("soup") && !selectedCategories.includes("main") && !selectedCategories.includes("salat")) {
            showAlert("Выберите главное блюдо, салат или стартер");
            return false;
        } else if (selectedCategories.includes("salat") && !selectedCategories.includes("soup") && !selectedCategories.includes("main")) {
            showAlert("Выберите суп или главное блюдо");
            return false;
        } else if (selectedCategories.includes("drink") && !selectedCategories.includes("main") && !selectedCategories.includes("salat")) {
            showAlert("Выберите главное блюдо");
            return false;
        } else if (!isValidCombo) {
            showAlert("Выберите все необходимые блюда для заказа");
            return false;
        }

        return true;// Если все проверки прошли, возвращаем true
    };

    // Функция для создания и отображения уведомлений
    const showAlert = (message) => { 
        // Создаем элемент уведомления
        const alertBox = document.createElement("div");
        alertBox.classList.add("alert"); // Добавляем класс для стилей
        alertBox.innerHTML = `<p>${message}</p><button>Окей 👌</button>`; // Устанавливаем текст сообщения и кнопки
        // Добавляем уведомление на страницу
        document.body.appendChild(alertBox);

        // Добавляем обработчик для кнопки закрытия уведомления
        const alertButton = alertBox.querySelector("button");
        alertButton.addEventListener("click", () => {
            alertBox.remove();
        });
    };


    
    const soupSection = document.querySelector("#soup-section .dishes");
    const mainSection = document.querySelector("#main-section .dishes");
    const salatSection = document.querySelector("#salat-section .dishes");
    const drinkSection = document.querySelector("#drink-section .dishes");
    const desertSection = document.querySelector("#desert-section .dishes");

    document.querySelectorAll(".filters button").forEach(filter => {
        filter.addEventListener("click", (event) => {
            const section = event.target.closest("section");
            const previouslyActive = section.querySelector(".filters button.active");
            if (previouslyActive === event.target) {
                event.target.classList.remove("active");
                filterDishes(section, "all");
            } else {
                section.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
                event.target.classList.add("active");
                const kind = event.target.getAttribute("data-kind");
                filterDishes(section, kind);
            }
        });
    });

    const filterDishes = (section, kind) => {
        const sectionDishes = section.querySelectorAll(".dish");
        sectionDishes.forEach(dishElement => {
            const dishKeyword = dishElement.getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dishKeyword);
            if (kind === "all" || dish.kind.includes(kind)) {
                dishElement.style.display = "block";
            } else {
                dishElement.style.display = "none";
            }
        });
    };

    dishes.sort((a, b) => a.name.localeCompare(b.name));

    dishes.forEach(dish => {
        const dishElement = document.createElement("div");
        dishElement.classList.add("dish");
        dishElement.setAttribute("data-dish", dish.keyword);

        dishElement.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button class="add">Добавить</button>
            </div>
        `;

        if (dish.category === "soup") {
            soupSection.appendChild(dishElement);
        } else if (dish.category === "main") {
            mainSection.appendChild(dishElement);
        } else if (dish.category === "salat") {
            salatSection.appendChild(dishElement);
        } else if (dish.category === "drink") {
            drinkSection.appendChild(dishElement);
        } else if (dish.category === "desert") {
            desertSection.appendChild(dishElement);
        }
    });

    const orderForm = {
        soup: document.getElementById("selected-soup"),
        main: document.getElementById("selected-main"),
        salat: document.getElementById("selected-salat"),
        drink: document.getElementById("selected-drink"),
        desert: document.getElementById("selected-desert"),
        totalPrice: document.querySelector("#total-price .price-value")
    };
//////////////////////////////////////////////////////////////////////////////////
// const filterDishes = (section, kind) => {
//     const sectionDishes = section.querySelectorAll(".dish");
//     sectionDishes.forEach(dishElement => {
//         const dishKeyword = dishElement.getAttribute("data-dish");
//         const dish = dishes.find(d => d.keyword === dishKeyword);
//         if (kind === "all" || dish.kind.includes(kind)) {
//             dishElement.style.display = "block";
//         } else {
//             dishElement.style.display = "none";
//         }
//     });
// };
// const loadDishes = async () => {
//     try {
//         console.log("Начинаем загрузку блюд...");
//         const response = await fetch('http://lab7-api.std-900.ist.mospolytech.ru/api/dishes');
//         console.log("Ответ от API получен");
        
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
        
//         const dishes = await response.json(); // Получаем блюда из API и преобразуем их в формат JSON
//         console.log("Данные блюд загружены:", dishes);

//         // Сортировка блюд по имени
//         dishes.sort((a, b) => a.name.localeCompare(b.name));

//         // Добавление блюд на страницу
//         dishes.forEach(dish => {
//             const dishElement = document.createElement("div");
//             dishElement.classList.add("dish");
//             dishElement.setAttribute("data-dish", dish.keyword);

//             dishElement.innerHTML = `
//                 <img src="${dish.image}" alt="${dish.name}">
//                 <div class="dish-info">
//                     <p class="price">${dish.price}₽</p>
//                     <p class="name">${dish.name}</p>
//                     <p class="weight">${dish.count}</p>
//                     <button class="add">Добавить</button>
//                 </div>
//             `;

//             // Размещение блюда в соответствующий раздел
//             if (dish.category === "soup") {
//                 soupSection.appendChild(dishElement);
//             } else if (dish.category === "main") {
//                 mainSection.appendChild(dishElement);
//             } else if (dish.category === "salat") {
//                 salatSection.appendChild(dishElement);
//             } else if (dish.category === "drink") {
//                 drinkSection.appendChild(dishElement);
//             } else if (dish.category === "desert") {
//                 desertSection.appendChild(dishElement);
//             }
//         });

//     } catch (error) {
//         console.error('Fetching dishes failed:', error);
//     }
// };

// // Вызовите функцию loadDishes(), чтобы данные загрузились при загрузке страницы
// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOMContentLoaded event triggered");
//     loadDishes(); // Загружаем блюда при загрузке страницы
//     // Ваш оставшийся код
// });

// // Инициализация формы заказа
// const orderForm = {
//     soup: document.getElementById("selected-soup"),
//     main: document.getElementById("selected-main"),
//     salat: document.getElementById("selected-salat"),
//     drink: document.getElementById("selected-drink"),
//     desert: document.getElementById("selected-desert"),
//     totalPrice: document.querySelector("#total-price .price-value")
// };
// console.log("Элементы секций:", soupSection, mainSection, salatSection, drinkSection, desertSection);


//////////////////////////////////////////////////////////    
    let selectedDishes = {
        soup: null,
        main: null,
        salat: null,
        drink: null,
        desert: null
    };

    const updateOrder = () => {
        let total = 0;
        let isAnyDishSelected = false;

        for (let category in selectedDishes) {
            if (selectedDishes[category]) {
                orderForm[category].textContent = `${selectedDishes[category].name} ${selectedDishes[category].price}₽`;
                total += selectedDishes[category].price;
                isAnyDishSelected = true;
            } else {
                orderForm[category].textContent = "Не выбрано";
            }
        }


        const noSelectionMessage = document.getElementById("no-selection-message");
        const soupOrder = document.getElementById("soup-order");
        const mainOrder = document.getElementById("main-order");
        const salatOrder = document.getElementById("salat-order");
        const drinkOrder = document.getElementById("drink-order");
        const desertOrder = document.getElementById("desert-order");
        const totalPriceBlock = document.getElementById("total-price-block");


        if (!isAnyDishSelected) {
            noSelectionMessage.style.display = 'block';
            soupOrder.style.display = 'none';
            mainOrder.style.display = 'none';
            salatOrder.style.display = 'none';
            drinkOrder.style.display = 'none';
            desertOrder.style.display = 'none';
            totalPriceBlock.style.display = 'none';
        } else {
            noSelectionMessage.style.display = 'none';
            soupOrder.style.display = 'block';
            mainOrder.style.display = 'block';
            salatOrder.style.display = 'block';
            drinkOrder.style.display = 'block';
            desertOrder.style.display = 'block';
            totalPriceBlock.style.display = 'block';
            orderForm.totalPrice.textContent = `${total}₽`;
        }
    };

    document.querySelectorAll(".dish").forEach(dishElement => {
        dishElement.addEventListener("click", (event) => {
            const dishKeyword = dishElement.getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dishKeyword);

            if (dish) {
                selectedDishes[dish.category] = dish;
                updateOrder();
            }
        });
    });
});
