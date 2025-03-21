document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const itemList = document.getElementById('item-list');
    const clearListButton = document.getElementById('clear-list-button');

    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function renderList() {
        itemList.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.purchased;
            checkbox.addEventListener('change', () => {
                item.purchased = checkbox.checked;
                updateLocalStorage();
                if (checkbox.checked) {
                    listItem.classList.add('purchased');
                } else {
                    listItem.classList.remove('purchased');
                }
            });

            const itemTextSpan = document.createElement('span');
            itemTextSpan.textContent = item.text;
            if (item.purchased) {
                listItem.classList.add('purchased');
            }

            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");

            editButton.addEventListener('click', () => {
                listItem.classList.add('editing');
                const itemTextInput = document.createElement('input');
                itemTextInput.type = 'text';
                itemTextInput.value = item.text;
                itemTextInput.addEventListener('blur', () => {
                    item.text = itemTextInput.value;
                    listItem.classList.remove('editing');
                    updateLocalStorage();
                    renderList();
                });
                listItem.appendChild(itemTextInput);
                itemTextInput.focus();
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(itemTextSpan);
            listItem.appendChild(editButton);
            itemList.appendChild(listItem);
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    addButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            shoppingList.push({ text: itemText, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    });

    clearListButton.addEventListener('click', () => {
        shoppingList = [];
        updateLocalStorage();
        renderList();
    });

    renderList();
});