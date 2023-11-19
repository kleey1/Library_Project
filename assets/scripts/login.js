function validate(event){

  event.preventDefault();

  const username = $("#Username").val();
  const password = $("#Password").val();
  var validated = true;

  console.log('isValidated [initial] = ', validated);

  const storedAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];

  if(username.length < 3){
    $("#usernameSpn").html("Invalid username, minimum 3 characters");
    validated = false;
  }

  if(password.length < 5){
    $("#passwordSpn").html("Invalid password, minimum 5 characters");
    validated = false;
  }
    else{
    const foundAccount = storedAccounts.find(account => account.username === username);
  
    if (foundAccount) {
    // If the username exists, check if the password matches
        if (foundAccount.password === password) {
            // Password matches, login successful
            alert("Logged in");
            event.preventDefault();
        } else {
            // Password does not match
            $("#passwordSpn").html("Incorrect password");
            event.preventDefault();
            validated = false;
    }
    } else {
        // Username does not exist
        $("#usernameSpn").html("This username does not have an account");
        event.preventDefault();
        validated = false;
    }
  }
  if(validated == false)
  {
    return
  }
    
  handleSubmit(username, password);
  window.location.href = 'Main.html';
}


function handleSubmit(Name, Password){
    // Create Object
    var newLogin = {
        username: Name,
        password: Password
    }

    console.log('newLogin Object = ', newLogin);
    var justLogged = JSON.parse(localStorage.getItem('LoggedNow')) || [];
    justLogged.push(newLogin);
    localStorage.setItem('LoggedNow', JSON.stringify(justLogged));

}


$(document).ready(function(){
    $("#LoginBtn").click(validate);

})

