const booksDiv = $("#booksdiv");
var existingBooks = JSON.parse(localStorage.getItem('AllBooks')) || [];
var categorySelected = JSON.parse(localStorage.getItem('Category')) || [];

function populateBooks(){

    $('#SelectedCategory').html(`You selected:&nbsp&nbsp ${categorySelected}`);
    console.log(`Selected category: ${categorySelected}`);

    $.each(existingBooks, function(index, book){

        if(book.category == categorySelected){
        console.log(`Index = ${index}. Book = ${book}`);
        console.log(`Found book category: ${book.category}`);
        
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
        }
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