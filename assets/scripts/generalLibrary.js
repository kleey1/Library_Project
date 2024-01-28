const booksDiv = $("#booksdiv");
var productList=[];
var booksAdded = JSON.parse(localStorage.getItem('addedBooks')) || [];
//--------------------------------------------------------------------------------------------------

// Function to fetch product data from the API
function fetchProductData() {
    fetch('http://localhost:3000/product') //kjo url ktu ehst url qe perdoret ke routes , me pak llaf ajo qe bejm test ke postman
    //fetch kerkon per ket specific url qe t marri response| me .then() vendosim se ca do bejm me the response
    //like fetch url (kjo lart) , .then() excute kdoing inside 
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }//tani kjo data esht formati data qe na vjen neve . esht object so we access it like obj
        }).then(data=> {
            productList= data.product //kam ber i global variable qe ta perdor edhe me von the response 
            console.log(productList) //shife ktu 

            //tani pak a shum kshu do behen edhe t tjerat , qe ti besh add ke personal library andstuff
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

    booksAdded.forEach(function(product) {
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
         console.log(`Found = ${searchTitle}`);
    });
    
    if(foundProduct){
      console.log(`Personal Library before: ${booksAdded}`);
      const jsonString = JSON.stringify(foundProduct);
      console.log(`Book = ${jsonString}`);
      booksAdded.push(foundProduct);
      console.log(`Personal Library after: ${booksAdded}`);
      localStorage.setItem('addedBooks', JSON.stringify(booksAdded));
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