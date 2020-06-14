const openForm = document.querySelector(".main-button");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close")


openForm.addEventListener("click",function(e){
    modal.style.display = "flex"
})

closeModal.addEventListener("click", function(){
    modal.style.display = "none"
})

