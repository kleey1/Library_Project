
const booksDiv = $("#booksdiv");
var productList=[];
let booksAded=[];
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
            productList= data.product
            console.log(productList)

            productList.forEach(e =>{
    
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
})
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// Call the fetchProductData function when the page loads
window.onload = fetchProductData;

//-------------------------------------------------------------------------------------------------

$("#booksdiv").on('click', "#AddBtn", function(){
    $("#alreadyAdded").html("");
    const productId = $(this).data('book-id');
    const smproduct = productList.find(n => n._id === productId);

    console.log(`Selected product = ${smproduct.title}`);

    $("#add-book").text(smproduct.title);

    $("#addModal").show();
});

$("#ConfirmBtn").click(function(){
    var foundProduct = false;
    var alreadyAdded = false;
    var searchTitle = $("#add-book").text();

    productList.forEach(function(product) {
        if(product.title == searchTitle){
        console.log(`Already added = ${searchTitle}`);
        alreadyAdded = true;
        }
    });

    if(alreadyAdded){
      $("#alreadyAdded").html('This product is already in your library!');
      return;
    }

    productList.forEach(function(product) {
        if(product.title == searchTitle)
         foundProduct = product;
    });
    
    if(foundProduct){
      console.log(`Personal Library array: ${booksAded}`);
      booksAded.push(foundProduct);
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