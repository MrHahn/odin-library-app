const myLibrary = [];
const libraryWrap = document.querySelector('.library-wrapper');
const newBtn = document.querySelector('.new-book');
const dialogBox = document.querySelector('dialog');
const submitBtn = document.querySelector('form button');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
     let book = new Book(title, author, pages, read);
     myLibrary.push(book);
}


//i think i need to rewrite the display library function and use javascript to create the elements instead of template literals
function displayLibrary() {
    libraryWrap.innerHTML = '';
    for (let [index, book] of myLibrary.entries()){
        let card = document.createElement('div');
        card.classList.add('library-card');
        card.innerHTML =`
            <span class="title">${book.title}</span>
            <span class="author">${book.author}</span>
            <span class="pages">${book.pages}</span>
            <span cass="read">${book.read}</span>
        `;
        
        libraryWrap.appendChild(card);
        let removeBtn = addRemoveBtn(index);
        card.appendChild(removeBtn);


    }
}

function submitNewBook(e){
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = (function(){
        if(formData.get('have-read') === null){
            return 'not read'
        }else{
            return 'read';
        }
    })();

    addBookToLibrary(title, author, pages, read);
    displayLibrary();
    dialogBox.close();
    form.reset();

}

function removeBook(index){
   let removedBooks = myLibrary.splice(index, 1);
   console.log(removedBooks);
   displayLibrary();
}

function addRemoveBtn(index){
    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove Book';
    removeBtn.setAttribute('data-index', index);
    removeBtn.addEventListener('click', () => {
        removeBook(index);
    });
    return removeBtn;
}

newBtn.addEventListener('click', () => { dialogBox.showModal()});
closeBtn.addEventListener('click', () => { dialogBox.close()});
form.addEventListener('submit', submitNewBook );