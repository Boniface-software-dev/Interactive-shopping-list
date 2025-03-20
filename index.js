document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const itemList = document.getElementById('item-list');
    const markPurchasedButton = document.getElementById('mark-purchased-button');
    const clearListButton = document.getElementById('clear-list-button');

    let shoppingList = [];

    function renderList() {
        itemList.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.purchased;
            checkbox.addEventListener('change', () => {
                item.purchased = checkbox.checked;
                if (checkbox.checked) {
                    listItem.classList.add('purchased');
                } else {
                    listItem.classList.remove('purchased');
                }
            });

            const itemText = document.createElement('span');
            itemText.textContent = item.text;
            if (item.purchased) {
                listItem.classList.add('purchased');
            }

            listItem.appendChild(checkbox);
            listItem.appendChild(itemText);
            itemList.appendChild(listItem);
        });
    }

    addButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            shoppingList.push({ text: itemText, purchased: false });
            itemInput.value = '';
            renderList();
        }
    });

    markPurchasedButton.addEventListener('click', () => {
        const selectedItems = Array.from(itemList.querySelectorAll('li.selected'));
        selectedItems.forEach(item => {
            const index = parseInt(item.querySelector('input[type="checkbox"]').parentNode.getAttribute('data-index'));
            shoppingList[index].purchased = !shoppingList[index].purchased;
            if (shoppingList[index].purchased) {
              item.classList.add('purchased');
            } else {
              item.classList.remove('purchased');
            }
            item.classList.remove('selected');
        });
        renderList();
    });

    clearListButton.addEventListener('click', () => {
        shoppingList = [];
        renderList();
    });

    itemList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('selected');
        }
    });

    renderList(); // Initial render
});~
