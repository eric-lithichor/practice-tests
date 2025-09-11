const products = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Onsie",
    "Sauce Labs Bike Light",
    "Sauce Labs Fleece Jacket",
    "Test.allTheThings() T-Shirt (Red)"
];

export default class Products {
    static getRandomProduct() {
        const index = Math.floor(Math.random() * 6);
        return products[index];
    }
}