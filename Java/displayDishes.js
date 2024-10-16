
document.addEventListener("DOMContentLoaded", () => {
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




    dishes.forEach(dish => { // проходим по каждому объекту в массиве
        const dishElement = document.createElement("div");// создает новый элемент div для каждого блюда
        dishElement.classList.add("dish");// добавляет класс dish  к новому элементу
        dishElement.setAttribute("data-dish", dish.keyword);// устанавливает арибует data-dish

        //заплняем элементы блюда информацией 
        dishElement.innerHTML = ` 
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button class="add">Добавить</button>
            </div>
        `;
// добавление элемента блюда в нужную секцию
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

    //определение элементов формы заказа
    const orderForm = {
        soup: document.getElementById("selected-soup"),
        main: document.getElementById("selected-main"),
        salat: document.getElementById("selected-salat"),
        drink: document.getElementById("selected-drink"),
        desert: document.getElementById("selected-desert"), 
        totalPrice: document.querySelector("#total-price .price-value")
    };
// инициалиируем выбранные блюда
    let selectedDishes = {
        soup: null,
        main: null,
        salat: null,
        drink: null,
        desert: null
    };



    
   
// добавляем переменные
    const updateOrder = () => {
        let total = 0;
        let isAnyDishSelected = false;
// обновляем информацию о блюдах если блюдо выбрано то показана информация если нет то показано не выбрано 
        for (let category in selectedDishes) {
            if (selectedDishes[category]) {
                orderForm[category].textContent = `${selectedDishes[category].name} ${selectedDishes[category].price}₽`;
                total += selectedDishes[category].price;
                isAnyDishSelected = true;
            } else {
                orderForm[category].textContent = "Не выбрано";
            }
        }
// определение элементов для отображения сообщений и блоков заказа
        const noSelectionMessage = document.getElementById("no-selection-message");
        const soupOrder = document.getElementById("soup-order");
        const mainOrder = document.getElementById("main-order");
        const salatOrder = document.getElementById("salat-order");
        const drinkOrder = document.getElementById("drink-order");
        const desertOrder = document.getElementById("desert-order");  
        const totalPriceBlock = document.getElementById("total-price-block");

        //отображение или скрытие элементов в зависимости выбрано блюдо или нет
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
