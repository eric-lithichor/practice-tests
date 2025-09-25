const sortMethods = {
    'atoz': {
        'index': '0',
        'label': 'Name (A to Z)',
        'value': 'az'
    },
    'ztoa': {
        'index': '1',
        'label': 'Name (Z to A)',
        'value': 'za'
    },
    'lowtohigh': {
        'index': '2',
        'label': 'Price (low to high)',
        'value': 'lohi'
    },
    'hightolow': {
        'index': '3',
        'label': 'Price (high to low)',
        'value': 'hilo'
    }
}

export default class SortOrder {
    static getSortidentifier(order, type) {
        return sortMethods[order.toLowerCase()][type.toLowerCase()];
    }
}