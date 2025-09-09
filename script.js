document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon-container');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const productsGrid = document.querySelector('.products-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.querySelector('.cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    let cart = [];

    // Funções do Modal
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

    // Funções do Carrinho
    productsGrid.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('add-to-cart-btn')) {
            const productCard = target.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCartDisplay();
        }
    });

    // Adiciona evento de clique para remover item
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.dataset.id;
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
        }
    });

    // Atualiza o display do carrinho (itens e total)
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                <button class="remove-item" data-id="${item.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartCountSpan.textContent = cart.length;
        cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        }
    }
});