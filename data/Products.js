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
    }

    static getNumberOfProducts() {
        return products.length;
    }

    static createListOfProducts(items = 3) {
        const listOfProducts = [];
        if(items > products.length) {
            throw new Error("You can't add more items than there are products");
        }

        // get unique products to add to the cart
        let product;
        while(listOfProducts.length < items) {
            product = this.getRandomProduct();
            if(!listOfProducts.includes(product)) {
                listOfProducts.push(product);
            }
        }

        return listOfProducts;
    }
}