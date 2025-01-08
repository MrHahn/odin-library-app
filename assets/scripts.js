const myLibrary = [];
const libraryWrap = document.querySelector('.library-wrapper');
const newBtn = document.querySelector('.new-book');
const dialogBox = document.querySelector('dialog');
const submitBtn = document.querySelector('form button');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');

class Book{
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        if(this.read === 'read'){
            this.read = 'not read';
        }else{
            this.read = 'read';
        }
    }
}


// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

// Book.prototype.toggleRead = function(){
//     if(this.read === 'read'){
//         this.read = 'not read';
//     }else{
//         this.read = 'read';
//     }
// }

function addBookToLibrary(title, author, pages, read) {
     let book = new Book(title, author, pages, read);
     myLibrary.push(book);
}

function displayLibrary() {
    libraryWrap.innerHTML = '';
    for (let [index, book] of myLibrary.entries()){
        let card = document.createElement('div');
        card.classList.add('library-card');
        card.innerHTML =`
            <span class="title">${book.title}</span>
            <span class="author">Written by ${book.author}</span>
            <span class="pages">${book.pages} pages</span>
        `;
        libraryWrap.appendChild(card);
        let removeBtn = addRemoveBtn(index);
        card.appendChild(removeBtn);
        let readButton = addReadBtn(index);
        card.appendChild(readButton);
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
    removeBtn.classList.add('remove-book');
    removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>';
    removeBtn.addEventListener('click', () => {
        removeBook(index);
    });
    return removeBtn;
}

function addReadBtn(index){
    let readBtn = document.createElement('button');
    readBtn.classList.add('read-btn');
    readBtn.textContent = myLibrary[index].read;

    if(readBtn.textContent === 'read'){
        readBtn.classList.add('read');
    }
    readBtn.addEventListener('click', (e) => {
        myLibrary[index].toggleRead();
        displayLibrary();
    })
    return readBtn;
}

newBtn.addEventListener('click', () => { dialogBox.showModal()});
closeBtn.addEventListener('click', () => { dialogBox.close()});
form.addEventListener('submit', submitNewBook );