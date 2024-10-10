// 2. Реализуйте отображение блюд на страницу с помощью JavaScript.
// Необходимо написать скрипт, который будет перебирать массив с блюдами и выводить каждое из них в нужную секцию. Секции должны выглядеть также, 
// как при статичном выводе из прошлых лабораторных.
// - У каждого блока с блюдом должен быть data-атрибут "data-dish", в котором будет храниться название блюда на латинице.

document.addEventListener("DOMContentLoaded", () => {
    const soupSection = document.querySelector("#soup-section .dishes");
    const mainSection = document.querySelector("#main-section .dishes");
    const drinkSection = document.querySelector("#drink-section .dishes");



    // 5.Отсортируйте блюда каждой категории в алфавитном порядке.
    // - Используйте метод sort() перед отображением блюд на страницу. Блюда должны быть отсортированы в алфавитном порядке.
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
        } else if (dish.category === "drink") {
            drinkSection.appendChild(dishElement);
        }
    });



    const orderForm = {
        soup: document.getElementById("selected-soup"),
        main: document.getElementById("selected-main-dish"),
        drink: document.getElementById("selected-drink"),
        totalPrice: document.querySelector("#total-price .price-value")
    };

    let selectedDishes = {
        soup: null,
        main: null,
        drink: null
    };


    //     4.Реализуйте подсчет итоговой стоимости для всех выбранных позиций меню.
    // После блоков с выбранными блюдами должен располагаться блок "Стоимость заказа".
    // В блоке отображается итоговая стоимость всех блюд. Например, если был выбран только напиток, отобразиться его цена:
    const updateOrder = () => {
        let total = 0;
        for (let category in selectedDishes) {
            if (selectedDishes[category]) {
                orderForm[category].textContent = `${selectedDishes[category].name} ${selectedDishes[category].price}₽`;
                total += selectedDishes[category].price;
            } else {
                orderForm[category].textContent = "Не выбрано";
            }
        }
        orderForm.totalPrice.textContent = `${total}₽`;
    };



    //     3. Создайте скрипт, позволяющий выбрать блюдо и добавить его в форму "Сделать заказ".
    // - При клике на карточку с блюдом, его название и цена должны появляться в разделе формы "Ваш заказ". Блюдо должно отображаться в своей категории.
    // - Используйте data-атрибут, чтобы найти блюдо в массиве.
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
