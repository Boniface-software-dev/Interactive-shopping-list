document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const itemList = document.getElementById('item-list');
    const clearListButton = document.getElementById('clear-list-button');

    // Load the shopping list from local storage or initialize an empty array
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Function to render the shopping list items in the DOM
    function renderList() {
        // Clear the existing list before rendering
        itemList.innerHTML = '';

        // Iterate through each item in the shopping list
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li'); // Create list item
            
            // Create checkbox to mark items as purchased
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.purchased; // Set checkbox state based on item property
            
            // Add event listener to update item status when checkbox changes
            checkbox.addEventListener('change', () => {
                item.purchased = checkbox.checked; // Update item status
                updateLocalStorage(); // Save changes to local storage
                
                // Apply or remove 'purchased' class for visual indication
                if (checkbox.checked) {
                    listItem.classList.add('purchased');
                } else {
                    listItem.classList.remove('purchased');
                }
            });

            // Create span to display item text
            const itemTextSpan = document.createElement('span');
            itemTextSpan.textContent = item.text;
            
            // If the item is already purchased, apply styling
            if (item.purchased) {
                listItem.classList.add('purchased');
            }

            // Create an edit button
            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");

            // Add event listener for editing the item
            editButton.addEventListener('click', () => {
                listItem.classList.add('editing'); // Add editing class
                
                // Create input field for editing
                const itemTextInput = document.createElement('input');
                itemTextInput.type = 'text';
                itemTextInput.value = item.text;
                
                // Save changes when the input field loses focus
                itemTextInput.addEventListener('blur', () => {
                    item.text = itemTextInput.value; // Update item text
                    listItem.classList.remove('editing'); // Remove editing class
                    updateLocalStorage(); // Save changes
                    renderList(); // Re-render list
                });
                
                listItem.appendChild(itemTextInput); // Add input field to list item
                itemTextInput.focus(); // Auto-focus input field
            });

            // Append elements to the list item
            listItem.appendChild(checkbox);
            listItem.appendChild(itemTextSpan);
            listItem.appendChild(editButton);
            
            // Add list item to the DOM
            itemList.appendChild(listItem);
        });
    }

    // Function to update local storage with the current shopping list
    function updateLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    // Event listener for adding a new item to the list
    addButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim(); // Get user input and trim spaces
        
        if (itemText) { // Check if input is not empty
            shoppingList.push({ text: itemText, purchased: false }); // Add new item to list
            itemInput.value = ''; // Clear input field
            updateLocalStorage(); // Save changes
            renderList(); // Update UI
        }
    });

    // Event listener for clearing the entire list
    clearListButton.addEventListener('click', () => {
        shoppingList = []; // Reset shopping list
        updateLocalStorage(); // Save changes
        renderList(); // Update UI
    });

    // Initial render of the list when page loads
    renderList();
});