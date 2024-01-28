
const booksDiv = $("#booksdiv");

//--------------------------------------------------------------------------------------------------
// Function to fetch product data from the MongoDB database
//--------------------------------------------------------------------------------------------------

// Function to fetch product data from the API
function fetchProductData() {
    fetch('http://localhost:3000/product')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        }).then(data=> {
            var product = data.product
            console.log(product)
product.forEach(e =>{
    {
        const newDivHtml = `<div class="parent">
            <img id="image" class="child" src=${e.productImage}>
            <div id="description" class="child">
            <p id="title">${e.title}</p>
            <p id="author">${e.author}</p>
            <p id="category">${e.category}</p>
            <button id="AddBtn" data-book-id="${e._id}">Add</button>
            </div>
        </div>`;
               
        booksDiv.append(newDivHtml)
    }
})

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
/*
// Function to populate books
function populateBooks(existingBooks) {
    $.each(existingBooks, function(book) {
        const newDivHtml = `<div class="parent">
        <img id="image" class="child" src=${book.image}>
        <div id="description" class="child">
        <p id="title">${book.title}</p>
        <p id="author">${book.author}</p>
        <p id="category">${book.category}</p>
        <button id="AddBtn" data-book-id="${book.id}">Add</button>
        </div>
    </div>`;

        // Append new HTML to a container element (assuming booksDiv is defined elsewhere)
        booksDiv.append(newDivHtml);
    });
}
*/
// Call the fetchProductData function when the page loads
window.onload = fetchProductData;

//-------------------------------------------------------------------------------------------------


$("#productsDiv").on('click', "#AddBtn", function(){
    $("#alreadyAdded").html("");
    const productId = $(this).data('product-id');
    const product = existingProducts.find(n => n.id === productId);

    console.log(`Selected product = ${product.title}`);

    $("#add-product").text(product.title);

    $("#addModal").show();
});


/*

$("#ConfirmBtn").click(function(){
    var foundProduct = false;
    var alreadyAdded = false;
    var searchTitle = $("#add-product").text();

    ProductsPersonal.forEach(function(product) {
        if(product.title == searchTitle){
        console.log(`Already added = ${searchTitle}`);
        alreadyAdded = true;
        }
    });

    if(alreadyAdded){
      $("#alreadyAdded").html('This product is already in your library!');
      return;
    }

    existingProducts.forEach(function(product) {
        if(product.title == searchTitle)
         foundProduct = product;
    });
    
    if(foundProduct){
      console.log(`Personal Library array: ${ProductsPersonal}`);
      ProductsPersonal.push(foundProduct);
    }
    $("#addModal").hide();
});

$("#cancelAddBtn").click(function(){
    $("#addModal").hide();
});



function CategorySelect(element){
    console.log($(element));
    console.log($(element).data('cat'));
    const category = $(element).data('cat');
    localStorage.removeItem('Category');
    var categorySelected = JSON.parse(localStorage.getItem('Category')) || [];
    categorySelected.push($(element).data('cat'));
    localStorage.setItem('Category', JSON.stringify(categorySelected));
}
*/