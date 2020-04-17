
var addOrderbutton = document.querySelector("#addOrder");
var form = document.querySelector("#orderForm");
var addToOrderButton = document.querySelector("#addToOrder");
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
var edited = null;
var login = document.querySelector("#loginButton");
var appear = document.querySelector("#appear");
var register = document.querySelector("#registerButton");
var begin = document.querySelector("#beginRegistration");
var registrationPage = document.querySelector("#register");
var loginPage = document.querySelector("#login");
var error = document.querySelector("#registrationError")

var  BASERL = "https://limitless-brushlands-53311.herokuapp.com";

registrationPage.style.display = 'none';

error.style.display = 'none';


begin.onclick = function (){
  document.getElementById("register").style.display='block';
  document.getElementById("login").style.display='none';
}



login.onclick = function (){
  var userEmail = document.querySelector("#loginEmail");
  var userPassword = document.querySelector("#loginPassword");

  var email = userEmail.value;
  var pass = userPassword.value;

  var data = "&email=" + encodeURIComponent(email);
  data += "&password=" + encodeURIComponent(pass);

  fetch(BASEURL + "/sessions", {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
      loadOrders()
  })
  userEmail.value = ""
  userPassword.value = ""
};



addOrderbutton.onclick = function (){
  modal.style.display = "block";
};



span.onclick = function() {
modal.style.display = "none";
};



window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
  }
}



register.onclick = function () {
  var userFirstName = document.querySelector("#fname");
  var userLastName = document.querySelector("#lname");
  var userEmail = document.querySelector("#email");
  var userPassword = document.querySelector("#password");

  var firstName = userFirstName.value;
  var lastName = userLastName.value;
  var email = userEmail.value;
  var pass = userPassword.value;


  var data = "fname=" + encodeURIComponent(firstName);
  data += "&lname=" + encodeURIComponent(lastName);
  data += "&email=" + encodeURIComponent(email);
  data += "&password=" + encodeURIComponent(pass);

  fetch(BASEURL + "/users", {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
    if (response.status == 201){
      userFirstName.value = "";
      userLastName.value = "";
      userEmail.value = "";
      userPassword.value = "";
      console.log(firstName, lastName, email, pass)

      document.getElementById("login").style.display='block';
      document.getElementById("register").style.display='none';
      document.getElementById("createdUser").style.display='block';
      setTimeout(function () {
            document.getElementById('createdUser').style.display='none';
        }, 3000);
        return false;
    } else if (response.status == 422){
      error.style.display = 'block';
      setTimeout(function () {
            document.getElementById('registrationError').style.display='none';
        }, 3000);
        return false;
    }
  });
};



addToOrderButton.onclick = function () {
  var orderDrinkInput = document.querySelector("#order-drink");
  var orderHamburgerInput = document.querySelector("#order-hamburger");
  var orderFriesInput = document.querySelector("#order-fries");
  var orderDessertInput = document.querySelector("#order-dessert");
  var orderToyInput = document.querySelector("#order-toy");

  var orderDrink = orderDrinkInput.value;
  var orderHamburger = orderHamburgerInput.value;
  var orderFries = orderFriesInput.value;
  var orderDessert = orderDessertInput.value;
  var orderToy = orderToyInput.value;


  var data = "drink=" + encodeURIComponent(orderDrink);
  data += "&hamburger=" + encodeURIComponent(orderHamburger);
  data += "&fries=" + encodeURIComponent(orderFries);
  data += "&dessert=" + encodeURIComponent(orderDessert);
  data += "&toy=" + encodeURIComponent(orderToy);

  fetch(BASEURL + "/orders", {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
    loadOrders()
  });
  modal.style.display = "none";
  orderDrinkInput.value = "";
  orderHamburgerInput.value = "";
  orderFriesInput.value = "";
  orderDessertInput.value = "";
  orderToyInput.value = "";
};





function deleteOrderOnServer(orderId){
  fetch(BASEURL + "/orders/" + orderId, {
    method: "DELETE",
    credentials: "include",
  }).then(function(response) {
    loadOrders()
  });
}




function updateOrderOnServer(drink, hamburger, fries, dessert, toy,){
  var editDrink = drink;
  var editHamburger = hamburger;
  var editFries = fries;
  var editDessert = dessert;
  var editToy = toy;

  var data = "drink=" + encodeURIComponent(editDrink);
  data += "&hamburger=" + encodeURIComponent(editHamburger);
  data += "&fries=" + encodeURIComponent(editFries);
  data += "&dessert=" + encodeURIComponent(editDessert);
  data += "&toy=" + encodeURIComponent(editToy);

  fetch(BASEURL + "/orders/" + edited, {
    method: "PUT",
    credentials: "include",
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
    loadOrders()
  });
};



function loadOrders () {
  fetch(BASEURL + "/orders", {
    credentials: "include"
  }).then(function(response) {
    if (response.status == 200) {
      appear.style.display = "block";
      loginPage.style.display = "none";
      response.json().then(function(dataFromServer) {
        //data from server now available for use.
        orders = (dataFromServer);
        var ordersList = document.querySelector("#order");
        ordersList.innerHTML = ""
        orders.forEach(function(order){

          var listItem = document.createElement("li");
          listItem.innerHTML = "ORDER: ";
          listItem.style.height = "210px";
          listItem.style.backgroundColor = "grey";
          listItem.style.padding = "15px";
          listItem.style.margin = "10px"

          var drinkElement = document.createElement("div");
          drinkElement.innerHTML = order.drink;
          drinkElement.classList.add("drink");
          listItem.appendChild(drinkElement);

          var hamburgerElement = document.createElement("div");
          hamburgerElement.innerHTML = order.hamburger;
          hamburgerElement.classList.add("hamburger");
          listItem.appendChild(hamburgerElement);

          var friesElement = document.createElement("div");
          friesElement.innerHTML = order.fries;
          friesElement.classList.add("fries");
          listItem.appendChild(friesElement);

          var dessertElement = document.createElement("div");
          dessertElement.innerHTML = order.dessert;
          dessertElement.classList.add("dessert");
          listItem.appendChild(dessertElement);

          var toyElement = document.createElement("div");
          toyElement.innerHTML = order.toy;
          toyElement.classList.add("toy");
          listItem.appendChild(toyElement);


          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.style.backgroundColor = "red";
          deleteButton.style.marginTop = "7px";
          deleteButton.onclick = function () {
            console.log("you clicked me", order);
            if (confirm("Are you sure you want to delete order " + order.id + "?")){
              deleteOrderOnServer(order.id);
            }
          };
          listItem.appendChild(deleteButton)

          var editButton = document.createElement("button");
          editButton.innerHTML = "Edit";
          editButton.style.margin = "7px";
          editButton.onclick = function () {
            modal.style.display = "block";
            addToOrderButton.style.display = "none";


            var orderDrinkInput = document.querySelector("#order-drink");
            var orderHamburgerInput = document.querySelector("#order-hamburger");
            var orderFriesInput = document.querySelector("#order-fries");
            var orderDessertInput = document.querySelector("#order-dessert");
            var orderToyInput = document.querySelector("#order-toy");

            edited = order.id
            orderDrinkInput.value = order.drink;
            orderHamburgerInput.value = order.hamburger;
            orderFriesInput.value = order.fries;
            orderDessertInput.value = order.dessert;
            orderToyInput.value = order.toy;

            var save = document.querySelector("#saveToOrder");
            save.onclick = function () {
              updateOrderOnServer(orderDrinkInput.value, orderHamburgerInput.value, orderFriesInput.value, orderDessertInput.value, orderToyInput.value);

              modal.style.display = "none";
            }
          }
          listItem.appendChild(editButton)

          ordersList.appendChild(listItem);
      });
    });
  } else if(response.status == 401){
    appear.style.display = "none";
    loginPage.style.display = "block";
    document.getElementById("loginFailed").style.display='block';
    setTimeout(function () {
          document.getElementById('loginFailed').style.display='none';
      }, 3000);
      return false;
  }
});
}





loadOrders()
