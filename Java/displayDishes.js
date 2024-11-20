
const lunchCombos = [
    ["Суп", "Главное блюдо", "стартер", "Напиток"],
    ["Суп", "Главное блюдо", "Напиток"],
    ["Суп", "СТартер", "Напиток"],
    ["Главное блюдо", "Стартер", "Напиток"],
    ["Главное блюдо", "Напиток"]
];
// добавляем обработчик событий и определяем переменные для секций
document.addEventListener("DOMContentLoaded", () => {
  const soups = document.querySelector("#soups .dishes");
  const mains = document.querySelector("#mains .dishes");
  const drinks = document.querySelector("#drinks .dishes");
  const starts = document.querySelector("#starts .dishes");
  const deserts = document.querySelector("#deserts .dishes");




});

let dishes = [];



const filterDishes = (section, kind) => {
    const sectionDishes = section.querySelectorAll(".dish");
    sectionDishes.forEach(dishElement => {
        const dishKeyword = dishElement.getAttribute("data-dish");
        const dish = dishes.find(d => d.keyword === dishKeyword);
        if (kind === "all" || dish.kind.includes(kind)) {
            dishElement.style.display = "flex";
        } else {
            dishElement.style.display = "none";
        }
    });
};

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


const loadDishes = () => {
    fetch("http://lab7-api.std-900.ist.mospolytech.ru/api/dishes")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Ошибка загрузки данных");
            }
        })
        .then(data => {
             
            data.sort((a, b) => a.name.localeCompare(b.name));

            soups.innerHTML = ''; 
            mains.innerHTML = '';
            drinks.innerHTML = '';
            starts.innerHTML = '';
            deserts.innerHTML = '';

            
            dishes = data

            dishes.forEach(dish => {
                const dishElement = document.createElement("div");
                dishElement.classList.add("dish");
                dishElement.setAttribute("data-dish", dish.keyword);

                //заполняем элементы блюда информацией 
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
                    soups.appendChild(dishElement);
                } else if (dish.category === "main-course") {
                    mains.appendChild(dishElement);
                } else if (dish.category === "drink") {
                    drinks.appendChild(dishElement);
                } else if (dish.category === "salad") {
                    starts.appendChild(dishElement);
                } else if (dish.category === "dessert") {
                    deserts.appendChild(dishElement);
                }
            });
        })
        .catch(error => {
            console.error("Ошибка загрузки данных: ", error);
        });

        
};

// вызываем loadDishes только один раз после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    loadDishes(); 
});




});



//определение элементов формы заказа
const orderForm = {
    soup: document.getElementById("selected-soup"),
    salad: document.getElementById("selected-start"),
    'main-course': document.getElementById("selected-main-dish"),
    dessert: document.getElementById("selected-desert"),
    drink: document.getElementById("selected-drink"),
    totalPrice: document.querySelector("#total-price .price-value")
};
// инициалиируем выбранные блюда
let selectedDishes = {
    soup: null,
    salad: null,
    'main-course': null,
    dessert: null,
    drink: null
};




// добавляем переменные
const updateOrder = () => {
    let total = 0;
    let isAnyDishSelected = false;
// обновляем информацию о блюдах если блюдо выбрано то показана информация если нет то показано не выбрано 
    for (category in selectedDishes) {
        if (selectedDishes[category]) {
            orderForm[category].textContent = `${selectedDishes[category].name} ${selectedDishes[category].price}₽`;
            total += selectedDishes[category].price;
            isAnyDishSelected = true;
        } 
        else {
            orderForm[category].textContent = "Не выбрано";
        }
    }


    const noSelectionMessage = document.getElementById("no-selection-message");
    const soupOrder = document.getElementById("soup-order");
    const startOrder = document.getElementById("start-order");
    const mainOrder = document.getElementById("main-order");
    const desertOrder = document.getElementById("desert-order");
    const drinkOrder = document.getElementById("drink-order");
    const totalPriceBlock = document.getElementById("total-price-block");

    //отображение или скрытие элементов в зависимости выбрано блюдо или нет
    if (!isAnyDishSelected) {
        noSelectionMessage.style.display = 'block';
        soupOrder.style.display = 'none';
        startOrder.style.display = 'none';
        mainOrder.style.display = 'none';
        desertOrder.style.display = 'none';
        drinkOrder.style.display = 'none';
        totalPriceBlock.style.display = 'none';
    } else {
        noSelectionMessage.style.display = 'none';
        soupOrder.style.display = 'block';
        startOrder.style.display = 'block';
        mainOrder.style.display = 'block';
        desertOrder.style.display = 'block';
        drinkOrder.style.display = 'block';
        totalPriceBlock.style.display = 'block';
        orderForm.totalPrice.textContent = `${total}₽`;
    }
};

// Весь ваш существующий код

document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                document.querySelectorAll(".dish").forEach(dishElement => {
                    dishElement.addEventListener("click", handleClick);
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});

function handleClick(event) {
    const dishElement = event.currentTarget;
    console.log("Клик зарегистрирован на элемент:", dishElement);

    const keyword = dishElement.getAttribute("data-dish");
    console.log(`Получено keyword: ${keyword}`);

    const dish = dishes.find(d => d.keyword === keyword);
    if (dish) {
        selectedDishes[dish.category] = dish;
        updateOrder();
    } else {
        console.error('Блюдо не найдено:', keyword);
    }
}


document.querySelectorAll(".dish").forEach(dishElement => {
    console.log(`Добавляем обработчик к элементу с keyword: ${dishElement.getAttribute("data-dish")}`);
    
    dishElement.addEventListener("click", (event) => {
        console.log("Клик зарегистрирован на элемент:", dishElement);

        const keyword = dishElement.getAttribute("data-dish");
        console.log(`Получено keyword: ${keyword}`);

        const dish = dishes.find(d => d.keyword === keyword);
        if (dish) {
            selectedDishes[dish.category] = dish;
            updateOrder();
        } else {
            console.error('Блюдо не найдено:', keyword);
        }
    });
});


function addEventListeners() {
    const dishElements = document.querySelectorAll(".dish");
    if (dishElements.length > 0) {
        dishElements.forEach(dishElement => {
            dishElement.addEventListener("click", handleClick);
        });
    } else {
        console.log("Элементы с классом .dish не найдены.");
    }
}

document.addEventListener("DOMContentLoaded", addEventListeners);







const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!checkLunchComposition()){
            return;
        }

        form.submit();

    });

    const checkLunchComposition = () => {
        let selectedCategories = Object.keys(selectedDishes).filter(category => selectedDishes[category]);
        let isValid = lunchCombos.some(combo => combo.every(item => selectedCategories.includes(item)));

        if (!isValid) {

            const missingItems = getMissingItems(selectedCategories);
            if (missingItems == false) {
                form.submit();
            }else{
            showAlert(missingItems);
            }
             
        } 
    };

    const getMissingItems = (selectedCategories) => {
    
        const allItems = ["soup", "main-course", "salad", "drink"];
        let missingItems = allItems.filter(item => !selectedCategories.includes(item));

        if (missingItems.length === 4) {
            return "Ничего не выбрано. Выберите блюда для заказа";
        } else if  (!missingItems.includes("salad") && missingItems.includes("soup") && missingItems.includes("main-course")) {
            return "Выберите суп или главное блюдо";
        } else if  (missingItems.includes("salad") && !missingItems.includes("soup") && missingItems.includes("main-course")) {
            return "Выберите главное блюдо/салат/стартер";
        } else if  (!missingItems.includes("salad") && !missingItems.includes("soup") && !missingItems.includes("main-course") && missingItems.includes("drink")) {
            return "Выберите напиток";
        } else if  (!missingItems.includes("drink") && missingItems.includes("main-course")) {
            return "Выберите Главное блюдо";
        } else if (!missingItems.includes("salad") && !missingItems.includes("soup") && !missingItems.includes("main-course") && !missingItems.includes("drink")){
            form.submit();
            return false;
        }
        

    }


const showAlert = (message) => {
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert");
    alertBox.innerHTML = `<p>${message}</p><button>Окей 👌</button>`;

    document.body.appendChild(alertBox);

    const alertButton = alertBox.querySelector("button");
    alertButton.addEventListener("click", () => {
        alertBox.remove();
});


};











    
    








