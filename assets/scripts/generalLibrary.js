
class Book{
    constructor(id, image, title, author, category){

        this.id = id;
        this.image = image;
        this.title = title;
        this.author = author;
        this.category = category;
    }

}

const books = [
    new Book(1, "/assets/images/book1.jpg",  "Harry Potter and the Goblet of Fire", "J.K.Rowling", "Fantasy"),
    new Book(2, "/assets/images/book2.jpg", "The Hunchback of Notre Dame", "Viktor Hugo", "Historical"),
    new Book(3, "/assets/images/book3.jpg", "The Outsider", "Stephen King", "Horror"),
    new Book(4, "/assets/images/book4.jpg", "A Little Life", "Hanya Yanagihara", "Tragedy"),
    new Book(5, "/assets/images/book5.jpg", "A Thousands Splendid Suns", "Khaled Hosseini", "Historical"),
    new Book(6, "/assets/images/book6.jpg", "When Breath Becomes Air", "Paul Kalanithi", "Biography")
];

localStorage.removeItem('AllBooks');

function AddBooksToStorage(book){
    var existingBooks = JSON.parse(localStorage.getItem('AllBooks')) || [];
    if (!Array.isArray(existingBooks)) {
        existingBooks = []; // Initialize as an array if it's not one already
    }
    existingBooks.push(book);
    localStorage.setItem('AllBooks', JSON.stringify(existingBooks));
}

books.forEach(function(book) {
    AddBooksToStorage(book);
    console.log(`Added book to General = ${book.title}`);
});


const booksDiv = $("#booksdiv");
var existingBooks = JSON.parse(localStorage.getItem('AllBooks')) || [];

function populateBooks(){
    $.each(existingBooks, function(index, book){

        console.log(`Index = ${index}. Book = ${book}`);

        //AddBooksToStorage(book);
        
        const newDivHtml = `<div class="parent">
        <img id="image" class="child" src=${book.image}>
        <div id="description" class="child">
        <p id="title">${book.title}</p>
        <p id="author">${book.author}</p>
        <p id="category">${book.category}</p>
        <button id="AddBtn" data-book-id="${book.id}">Add</button>
        </div>
    </div>`;

        booksDiv.append(newDivHtml);
    });
}

populateBooks();



$("#booksdiv").on('click', "#AddBtn", function(){
    $("#alreadyAdded").html("");
    const bookId = $(this).data('book-id');
    const book = existingBooks.find(n => n.id === bookId);

    console.log(`Selected book = ${book.title}`);

    $("#add-book").text(book.title);

    $("#addModal").show();
})

var BooksPersonal = JSON.parse(localStorage.getItem('addedBooks')) || [];

if (!Array.isArray(BooksPersonal)) {
    BooksPersonal = [];
}

$("#ConfirmBtn").click(function(){
    var foundBook = false;
    var alreadyAdded = false;
    var searchTitle = $("#add-book").text();

    BooksPersonal.forEach(function(book) {
        if(book.title == searchTitle){
        console.log(`Already added = ${searchTitle}`);
        alreadyAdded = true;
        }
    });

    if(alreadyAdded){
      $("#alreadyAdded").html('This book is already in your library!')
      return;
    }

    existingBooks.forEach(function(book) {
        if(book.title == searchTitle)
         foundBook = book;
    });
    console.log(`FoundBook = ${foundBook}, ${searchTitle}`);
    //console.log(typeof BooksPersonal);
    
    if(foundBook){
      console.log(`Personal Library array: ${BooksPersonal}`);
      BooksPersonal.push(foundBook);
      localStorage.setItem('addedBooks', JSON.stringify(BooksPersonal));
    }
    $("#addModal").hide();
});

$("#cancelAddBtn").click(function(){
    $("#addModal").hide();

});

function CategorySelect(element){

    console.log($(element));
    console.log($(element).data('cat'));
    const categ = $(element).data('cat');
    localStorage.removeItem('Category');
    var categorySelected = JSON.parse(localStorage.getItem('Category')) || [];
    categorySelected.push($(element).data('cat'));
    localStorage.setItem('Category', JSON.stringify(categorySelected));
    
    }

