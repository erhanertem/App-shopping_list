const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const btnClear = document.getElementById('clear');
const btnReset = document.getElementById('reset');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

function displayItems() {
	// Get items from local storage
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDOM(item));

	// Render changes to UI
	renderChangesUI();
}
function addItem(e) {
	e.preventDefault();
	const itemText = itemInput.value.trim();
	// GUARD CLAUSE
	if (!itemText) {
		alert('Please add an item');
		return;
	}

	// Add item to the DOM
	addItemToDOM(itemText);
	// Add item to localstorage
	addItemToStorage(itemText);

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
	if (e.target.parentElement.classList.contains('remove-item')) {
		const removeItem = e.target.closest('li').textContent;
		if (confirm('Are you sure?')) {
			// Remove item from local storage and DOM
			removeItemsFromStorage(removeItem);
			e.target.closest('li').remove();
			// Render changes to UI
			renderChangesUI();
		}
	} else {
		setItemToEdit(e.target);
	}
}

function setItemToEdit(item) {
	isEditMode = true;

	// AT EVERY CLICK RESET EDIT-MODE TEMP CLASS ASSIGMENT TO SWITCH BETWEEN ITEMS
	itemList.querySelectorAll('li').forEach((el) => el.classList.remove('edit-mode'));

	// CHANGE STYLES UPON CLICK
	item.classList.add('edit-mode'); // item.style.color = '#ccc';
	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
	formBtn.style.backgroundColor = '#228B22';

	// FILL IN ITEM NAME ON THE INPUT FIELD
	itemInput.value = item.textContent;
}

function deleteAllItems() {
	// Delete everything inside the list container
	itemList.innerHTML = '';
	// Clear localstorage
	removeAllItemsFromStorage();
	// Render changes to UI
	renderChangesUI();
}
function renderChangesUI() {
	if (itemList.childElementCount === 0) {
		btnClear.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		btnClear.style.display = '';
		itemFilter.style.display = '';
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

// APP INITIALIZER
function init() {
	// Event Listeners
	itemForm.addEventListener('submit', addItem);
	itemList.addEventListener('click', deleteItem);
	btnClear.addEventListener('click', deleteAllItems);
	itemFilter.addEventListener('input', filterItems);
	btnReset.addEventListener('click', getList);
	document.addEventListener('DOMContentLoaded', displayItems);

	// INITIAL FILTER SEARCH RESET BTN CSS STATE
	btnReset.style.display = 'none';
	// RENDER UI ELEMENTS (FILTER BAR & RESET BUTTON)
	renderChangesUI();
}
init();

// LOCAL STORAGE API
function removeItemsFromStorage(removeItem) {
	// Get items from local storage
	let items = getItemsFromStorage();
	// Remove the item from the array and update the local storage
	newItems = items.filter((el) => el !== removeItem);
	localStorage.setItem('items', newItems);
}
function removeAllItemsFromStorage() {
	localStorage.removeItem('items');
}
function getItemsFromStorage() {
	// READ THE STORAGE INFORMATION
	let itemsFromStorage;
	!localStorage.getItem('items')
		? (itemsFromStorage = [])
		: (itemsFromStorage = JSON.parse(localStorage.getItem('items')));

	return itemsFromStorage;
}
function addItemToStorage(item) {
	// READ THE STORAGE INFORMATION
	let itemsFromStorage = getItemsFromStorage();
	// ADD TO TEMP STORAGE OBJECT
	itemsFromStorage.push(item);
	// CONVERT THE NEW STORAGE DATA TO JSON AND STORE @ LOCALSTORAGE
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
