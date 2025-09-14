const products = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Onesie",
    "Sauce Labs Bike Light",
    "Sauce Labs Fleece Jacket",
    // "Test.allTheThings() T-Shirt (Red)"
];

export default class Products {
    static getRandomProduct() {
        const index = Math.floor(Math.random() * products.length );
        return products[index];
        // return products[5];
    }

    static getNumberOfProducts() {
        return products.length;
    }
}