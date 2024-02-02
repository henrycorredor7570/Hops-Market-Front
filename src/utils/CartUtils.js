export function startSyncing(local) {
    return {
        ...local,
        syncing: true
    }
}

export function stopSyncing(local) {
    return {
        ...local,
        syncing: false
    }
}

export function setCart(local, remote) {
    const quantities = buildQuantitiesObject(remote.products)
    return {
        syncing: false,
        products: remote.products,
        total: remote.total,
        quantities: quantities
    }
}

export function mergeCart(local, row) {
    const products = addOrUpdateProduct(local.products, row)
    return updateCartTotal({
        ...local,
        products: products,
        quantities: buildQuantitiesObject(products)
    })
}

export function emptyCart() {
    return {
        syncing: true,
        products: null,
        total: null,
        quantities: {}
    }
}

export function totalQuantities(quantities) {
    let total = 0
    for (const key in quantities) {
        total = total + quantities[key] 
    }
    return total;
} 

function buildQuantitiesObject(products) {
    if (products == null) {
        return {}
    }

    return products.reduce((accumulator, currentItem) => {
        accumulator[currentItem.id] = currentItem.quantity;
        return accumulator;
    }, {});
}

function addOrUpdateProduct(products, newProduct) {
    if (products == null) {
        return [ newProduct ]
    }

    const existingProduct = products.find(product => product.id === newProduct.id);

    if (existingProduct) {
        if (newProduct.quantity == 0) {
            return products.filter((product) => product.id !== newProduct.id)
        } else {
            existingProduct.quantity = newProduct.quantity;
        }
    } else {
        products.unshift(newProduct);
    }

    return products;
}

function updateCartTotal(cart) {
    return {
        ...cart,
        total: cart.products.reduce((accumulator, product) => {
            return accumulator + parseFloat(product.price) * product.quantity
        }, 0).toFixed(2).toString()
    }
}
