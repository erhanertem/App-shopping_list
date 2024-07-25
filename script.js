const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const btnClear = document.getElementById('clear');
const btnReset = document.getElementById('reset');
const itemFilter = document.getElementById('filter');

function addItem(e) {
	e.preventDefault();
	const itemText = itemInput.value.trim();
	// GUARD CLAUSE
	if (!itemText) {
		alert('Please add an item');
		return;
	}

	// Add item to the list
	addItemToDOM(itemText);

	// Render changes to UI
	renderChangesUI();

	// Clear input field after submission
	itemInput.value = '';
}

function addItemToDOM(item) {
	const li = document.createElement('li');
	li.textContent = item;
	const btn = document.createElement('button');
	btn.classList.add('remove-item', 'btn-link', 'text-red');
	const i = document.createElement('i');
	i.classList.add('fa-solid', 'fa-xmark');
	btn.append(i);
	li.append(btn);

	// Append listItem to the list
	itemList.append(li);
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

function filterItems(e) {
	const filterValue = e.target.value.toLowerCase();
	let listLength = itemList.children.length;
	Array.from(itemList.children).filter((el) => {
		if (el.firstChild.textContent.trim().toLowerCase().includes(filterValue)) {
			el.style.display = '';
		} else {
			el.style.display = 'none';
			--listLength;
		}
		if (listLength === 0) {
			btnClear.style.display = 'none';
			btnReset.style.display = 'block';
		}
	});
}

function getList() {
	// Switch btns funcs
	btnClear.style.display = 'block';
	btnReset.style.display = 'none';

	// Reload list form exisitng HTML
	document.querySelectorAll('li').forEach((el) => (el.style.display = ''));

	// Clear filter field
	itemFilter.value = '';
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteItem);
btnClear.addEventListener('click', deleteAllItems);
itemFilter.addEventListener('input', filterItems);
btnReset.addEventListener('click', getList);

btnReset.style.display = 'none';
renderChangesUI();
