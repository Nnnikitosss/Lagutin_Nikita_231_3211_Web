// 1.Создайте массив объектов, в котором будут храниться все существующие блюда. У каждого объекта должны быть следующие свойства:

// - keyword (хранит название блюда на латинице, должно быть уникальным для каждого блюда)
// - name (название блюда)
// - price (цена)
// - category (категория на английском, например, "soup")
// - count (вес/объем)
// - image (путь к изображению, например "soups/gazpacho")

const dishes = [
    {
        keyword: "solyanka",
        name: "Солянка",
        price: 800,
        category: "soup",
        count: "350 г",
        image: "picture/1.webp"
    },
    {
        keyword: "borsch",
        name: "Борщ",
        price: 650,
        category: "soup",
        count: "400 г",
        image: "picture/2.webp"
    },
    {
        keyword: "tomato",
        name: "Томатный суп",
        price: 600,
        category: "soup",
        count: "300 г",
        image: "picture/3.webp"
    },
    {
        keyword: "lentil",
        name: "Чечевичный суп",
        price: 700,
        category: "soup",
        count: "350 г",
        image: "picture/4.webp"
    },
    {
        keyword: "udon",
        name: "Удон с овощами",
        price: 500,
        category: "main",
        count: "300 г",
        image: "picture/5.webp"
    },
    {
        keyword: "steak",
        name: "Говяжий стейк",
        price: 1200,
        category: "main",
        count: "250 г",
        image: "picture/6.webp"
    },
    {
        keyword: "meat-vegetables",
        name: "Мясо с овощами",
        price: 750,
        category: "main",
        count: "350 г",
        image: "picture/7.webp"
    },
    {
        keyword: "dumplings",
        name: "Пельмени",
        price: 600,
        category: "main",
        count: "300 г",
        image: "picture/8.webp"
    },
    {
        keyword: "iced-tea",
        name: "Холодный чай",
        price: 200,
        category: "drink",
        count: "300 мл",
        image: "picture/9.webp"
    },
    {
        keyword: "orange-juice",
        name: "Апельсиновый сок",
        price: 250,
        category: "drink",
        count: "300 мл",
        image: "picture/10.webp"
    },
    {
        keyword: "mojito",
        name: "Мохито",
        price: 350,
        category: "drink",
        count: "300 мл",
        image: "picture/11.webp"
    },
    {
        keyword: "coca-cola",
        name: "Кока-кола",
        price: 150,
        category: "drink",
        count: "330 мл",
        image: "picture/12.webp"
    }
];

