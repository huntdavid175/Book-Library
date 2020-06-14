const title = document.querySelector("#title").value;
const author = document.querySelector("#author").value
// console.log(title, author)




// Create a Constructor for the book objects 

function Book(title,author,pages,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = status;
}

let book = new Book(title,author)
console.log(book)

