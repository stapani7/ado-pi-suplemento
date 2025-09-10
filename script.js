document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon-container');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const productsGrid = document.querySelector('.products-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.querySelector('.cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    let cart = [];

    // Abrir e fechar modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Adicionar produto ao carrinho
    productsGrid.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('add-to-cart-btn')) {
            const productCard = target.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);
            const productImage = productCard.querySelector('img').src;

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            updateCartDisplay();
        }
    });

    // Interações dentro do carrinho
    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const productId = target.dataset.id;

        if (target.classList.contains('remove-item')) {
            cart = cart.filter(item => item.id !== productId);
        }

        if (target.classList.contains('increase')) {
            const item = cart.find(i => i.id === productId);
            if (item) item.quantity += 1;
        }

        if (target.classList.contains('decrease')) {
            const item = cart.find(i => i.id === productId);
            if (item && item.quantity > 1) item.quantity -= 1;
        }

        updateCartDisplay();
    });

    // Atualiza o display do carrinho
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalQuantity = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <span class="subtotal">Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                        <button class="remove-item" data-id="${item.id}">Remover</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);

            total += item.price * item.quantity;
            totalQuantity += item.quantity;
        });

        cartCountSpan.textContent = totalQuantity;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            cartTotalSpan.textContent = 'R$ 0,00';
        } else {
            cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }
});
