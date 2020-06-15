const openForm = document.querySelector(".main-button");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector(".secondary-button")
const toaster = document.querySelector("#toaster");


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
    inputs.forEach(function(input){
        input.value = ""
        input.style.borderColor = "gray"
    })
})

// CLose Modal functionality 

closeModal.addEventListener("click", function(){
    modal.style.display = "none"
})

// Submit functionality 

submitBtn.addEventListener("click",function(e){
    if(checkIfInputsEmpty() == true){
        console.log("form submitted")
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

// Constructor for books 

function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = status;
}

