document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const itemList = document.getElementById('item-list');
    const markPurchasedButton = document.getElementById('mark-purchased-button');
    const clearListButton = document.getElementById('clear-list-button');

    addButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            const listItem = document.createElement('li');
            listItem.textContent = itemText;
            itemList.appendChild(listItem);
            itemInput.value = '';
        }
    });

    markPurchasedButton.addEventListener('click', () => {
        const selectedItems = Array.from(itemList.querySelectorAll('li.selected'));
        selectedItems.forEach(item => {
            item.classList.toggle('purchased');
            item.classList.remove('selected');
        });
    });

    clearListButton.addEventListener('click', () => {
        itemList.innerHTML = '';
    });

    itemList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('selected');
        }
    });
});
