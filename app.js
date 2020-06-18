const openForm = document.querySelector(".main-button");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const inputs = document.querySelectorAll(".form-input");
const submitBtn = document.querySelector(".secondary-button");
const toaster = document.querySelector("#toaster");
const cardSection = document.querySelector(".cards-section");

// Change input fields border color when null and when not null

inputs.forEach(function (input) {
	input.addEventListener("click", function (e) {
		e.target.style.border = "1px solid green";
	});
});

inputs.forEach(function (input) {
	input.addEventListener("keyup", function (e) {
		if (e.target.value.trim() == "") {
			e.target.style.border = "1px solid red";
		} else {
			e.target.style.border = "1px solid green";
		}
	});
});

// Open Modal functionality

openForm.addEventListener("click", function (e) {
	modal.style.display = "flex";
	clearInputs();
});

// CLose Modal functionality

closeModal.addEventListener("click", function () {
	modal.style.display = "none";
});

// Submit functionality

submitBtn.addEventListener("click", function (e) {
	if (checkIfInputsEmpty() == true) {
		addBook();
		clearInputs();
	}
});

function checkIfInputsEmpty() {
	let val = 0;
	inputs.forEach(function (input) {
		if (input.value != "") {
			val += 1;
		}
	});

	if (val == 0) {
		inputs.forEach(function (input) {
			input.style.borderColor = "red";
		});
	}
	if (val == 3) {
		toaster.textContent = "Book Added";
		toaster.style.backgroundColor = "#4a4";
		toaster.style.color = "#ffffff";
		toaster.className = "show";
		setTimeout(function () {
			toaster.classList.remove("show");
		}, 3000);
		return true;
	} else {
		toaster.textContent = "Please fill all fields";
		toaster.style.backgroundColor = "#f2dede";
		toaster.style.color = "#a94442";
		toaster.className = "show";
		setTimeout(function () {
			toaster.classList.remove("show");
		}, 3000);
	}
}

// Clear inputs function

function clearInputs() {
	inputs.forEach(function (input) {
		input.value = "";
		input.style.borderColor = "gray";
	});
}

// Constructor for books

function Book(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = status;
}

Book.prototype.updateStatus = function (state) {
	if (state == true) {
		state = "Read";
	} else {
		state = "Not Read";
	}
	return (this.isRead = state);
};

// Collect Input Fields
let bookArray = [];
let retrieved;
function addBook() {
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const pages = document.querySelector("#pages").value;
	const status = document.querySelector("#read").checked;

	let book = new Book(title, author, pages, status);
	if (!localStorage.getItem("arrayOfBooks")) {
		bookArray.push(book);
		setItemToStorage(bookArray);
		showBook();
	} else {
		getItemFromStorage();
		retrieved.push(book);
		setItemToStorage(retrieved);
		showBook();
	}
}

// Add books to page

function showBook() {
	getItemFromStorage();
	cardSection.innerHTML = `${retrieved
		.map(function (book, i) {
			return `
       <div class="card" data-book-index= "${i}">
               <h2 id="card-title">${book.title}</h2>
               <h4 id="card-author">${book.author}</h4>
               <p id="card-pages">${book.pages} pages</p>
			   <span id="card-status">${isRead(book)}</span>
			   ${
						(isRead(book) == "Read" &&
							`<input type="checkbox" class="read-update" name="read" value="Read" checked>`) ||
						(isRead(book) == "Not Read" &&
							`<input type="checkbox" class="read-update" name="read" value="Read">`)
					}
               <button class="delete-book">Delete</button>
           </div>
       `;
		})
		.join("")}`;
}

// Check if book is read

function isRead(book) {
	if (book.isRead == true) {
		return "Read";
	} else if (book.isRead == false) {
		return "Not Read";
	} else {
		return book.isRead;
	}
}

document.body.addEventListener("click", function (e) {
	if (e.target.className == "read-update") {
		let status = e.target.checked;
		const checkIndex = e.target.parentNode.dataset.bookIndex;
		getItemFromStorage();
		retrieved[checkIndex].updateStatus(status);
		e.target.parentElement.querySelector("#card-status").textContent =
			retrieved[checkIndex].isRead;
		setItemToStorage(retrieved)
	}

	if (e.target.className == "delete-book") {
		const cardIndex = e.target.parentNode.dataset.bookIndex;
		deleteBook(cardIndex);
		showBook();
		deleteBookPopup();
	}
});

// Delete book function

function deleteBook(index) {
	// bookArray.splice(index, 1);
	getItemFromStorage();
	retrieved.splice(index, 1);
	setItemToStorage(retrieved);
}

// Deleted book Toaster

function deleteBookPopup() {
	toaster.textContent = "Book Deleted";
	toaster.style.backgroundColor = "#f2dede";
	toaster.style.color = "#a94442";
	toaster.className = "show";
	setTimeout(function () {
		toaster.classList.remove("show");
	}, 2000);
}

// function to save to localStorage

function setItemToStorage(arr) {
	localStorage.setItem("arrayOfBooks", JSON.stringify(arr));
}

// function to retrieve from localStorage

function getItemFromStorage() {
	retrieved = JSON.parse(localStorage.getItem("arrayOfBooks")).map(function(book){
		return book = new Book(book.title,book.author,book.pages,book.isRead)
	});
}

// Load  books on page load
window.addEventListener("load", showBook);
