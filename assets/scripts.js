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

function displayLibrary() {
    libraryWrap.innerHTML = '';
    for (let book of myLibrary){
        let card =`
            <div class="library-card">
            <span class="title">${book.title}</span>
            <span class="author">${book.author}</span>
            <span class="pages">${book.pages}</span>
            <span cass="read">${book.read}</span>
            </div>
        `;
        libraryWrap.insertAdjacentHTML('beforeend', card);
    }
}

function submitNewBook(){
    

}

newBtn.addEventListener('click', () => { dialogBox.showModal()});
closeBtn.addEventListener('click', () => { dialogBox.close()});
form.addEventListener('submit', submitNewBook );