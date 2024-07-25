const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const btnClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function createListItem(itemText) {
	const li = document.createElement('li');
	li.textContent = itemText;
	const btn = document.createElement('button');
	btn.classList.add('remove-item', 'btn-link', 'text-red');
	const i = document.createElement('i');
	i.classList.add('fa-solid', 'fa-xmark');
	btn.append(i);
	li.append(btn);
	return li;
}

function addItem(e) {
	e.preventDefault();

	const itemText = itemInput.value.trim();
	// GUARD CLAUSE
	if (!itemText) {
		alert('Please add an item');
		return;
	}

	// Append listItem to the list
	itemList.append(createListItem(itemText));

	// Render changes to UI
	renderChangesUI();

	// Clear input field after submission
	itemInput.value = '';
}

function deleteItem(e) {
	console.log();
	if (e.target.parentElement.classList.contains('remove-item')) {
		e.target.closest('li').remove();
	}
}

function deleteAllItems() {
	// Delete everything inside the list container
	itemList.innerHTML = '';

	// Render changes to UI
	renderChangesUI();
}

function renderChangesUI() {
	if (itemList.childElementCount === 0) {
		btnClear.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		btnClear.style.display = 'block';
		itemFilter.style.display = 'block';
	}
}
// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteItem);
btnClear.addEventListener('click', deleteAllItems);

renderChangesUI();
