const openForm = document.querySelector(".main-button");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector(".secondary-button")
const toaster = document.querySelector("#toaster");
const cardSection = document.querySelector(".cards-section")


// Change input fields border color when null and when not null

inputs.forEach(function(input){
    input.addEventListener("click",function(e){
        e.target.style.border = "1px solid green";
    })
});

inputs.forEach(function(input){
    input.addEventListener("keyup",function(e){
        if (e.target.value.trim() == ""){
            e.target.style.border = "1px solid red"
        }
        else{
            e.target.style.border ="1px solid green"
        }
    })
})


// Open Modal functionality 

openForm.addEventListener("click",function(e){
    modal.style.display = "flex"
    clearInputs()
})

// CLose Modal functionality 

closeModal.addEventListener("click", function(){
    modal.style.display = "none"
})

// Submit functionality 

submitBtn.addEventListener("click",function(e){
    if(checkIfInputsEmpty() == true){
        addBook()
        clearInputs()
    }
});


function checkIfInputsEmpty(){
    let val = 0
    inputs.forEach(function(input){
        if(input.value != ""){
            val += 1
        }
    })

    if (val == 0){
        inputs.forEach(function(input){
            input.style.borderColor = "red"
        })
    }
    if (val == 3){
        toaster.textContent = "Book Added"
        toaster.style.backgroundColor = "#4a4";
        toaster.style.color = "#ffffff"
        toaster.className = "show"
        setTimeout(function(){
            toaster.classList.remove("show")
        },3000)
        return true
    }
    else {
        toaster.textContent = "Please fill all fields";
        toaster.style.backgroundColor = "#f2dede";
        toaster.style.color = "#a94442"
        toaster.className = "show";
        setTimeout(function(){
            toaster.classList.remove("show")
        },3000)
    }
}

// Clear inputs function 

function clearInputs(){
    inputs.forEach(function(input){
        input.value = ""
        input.style.borderColor = "gray"
    })
}

// Constructor for books 

function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = status;
}

// Collect Input Fields 
let bookArray = []
function addBook(){
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#read").checked

    let book = new Book(title,author,pages,status);
    bookArray.push(book)
    showBook()
}

// Add books to page 

function showBook(){
   cardSection.innerHTML = `${bookArray.map(function(book){
       return `
       <div class="card">
               <h2 id="card-title">${book.title}</h2>
               <h4 id="card-author">${book.author}</h4>
               <p id="card-pages">${book.pages} pages</p>
               <span id="card-status">${isRead(book)}</span>
               <button class="delete-book">Delete</button>
           </div>
       `
   }).join("")}`
}


function isRead(book){
    if(book.isRead == true){
        return "Read"
    }
    else{
        return "Not Read"
    }
}
