
function purchase(event){
    event.preventDefault();
    var email = document.getElementById("email").value
  //  var ticketNumber = document.getElementById("ticketNumber").value

    console.log(email)
  //  console.log(ticketNumber)


    // 3. Log user In, then Log the purchase event

    var userIdentities = {userIdentities: {email: email}};
    mParticle.Identity.login(userIdentities, callback)


    function callback() {
      var currentUser = mParticle.Identity.getCurrentUser();
  //    currentUser.setUserAttribute("Park Visit Preference","Star Wars");
      mParticle.logEvent('Logged In',mParticle.EventType.Other,
    );
      }
}

function consent(event){
    event.preventDefault();

    var customerID = document.getElementById("email").value

    var userIdentities = {userIdentities: {customerid: customerID}};
    mParticle.Identity.login(userIdentities, callback)


    function callback() {
      var currentUser = mParticle.Identity.getCurrentUser();
      mParticle.logEvent('Set CookieId',  mParticle.EventType.UserPreference);

      }
}


function consent2(event){
    event.preventDefault();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;

    var gameTitle = document.getElementById("ticketNumber").value

    var product = mParticle.eCommerce.createProduct(
    gameTitle, //
    'econ-1',
    59.00,
    1
);

// 2. Summarize the transaction
var transactionAttributes = {
    Id: 'foo-transaction-id',
    Revenue: 430.00,
    Tax: 30
};

var currentUser = mParticle.Identity.getCurrentUser();

// Set user attributes associated with the user
currentUser.setUserAttribute("Last_Purchase_Game_Title",gameTitle);
currentUser.setUserAttribute("Last_Purchase_Date", today);


// 3. Log the purchase event
mParticle.eCommerce.logPurchase(transactionAttributes, product);




}


function requestPayment(){
    var email = document.getElementById("req_email").value
    var amount = document.getElementById("req_amount").value
    mParticle.logEvent("Request Money",mParticle.EventType.Transaction, { "Request Recipient" : email, "Amount" : amount, "Note" : "Sent via web"});
    closeForm("requestForm","reqbtn");
}

function createInvoice(){
    var email = document.getElementById("inv_email").value
    var amount = document.getElementById("inv_amount").value
    mParticle.logEvent("Invoice Sent",mParticle.EventType.Transaction, { "Bill To" : email, "Amount" : amount, "Note" : "Sent via web"});
    var currentUser = mParticle.Identity.getCurrentUser();
    //currentUser.setUserAttribute("Next Best", "business_app");
    closeForm("invoiceForm","invbtn");
}

function personalize(){
    //login();
    getProfile();
}

function login(){
    var identityRequest = {
        userIdentities: {
          customerid: customerID
        }
      }
      var identityCallback = function(result) {
        if (result.getUser()) {
          //proceed with login
        }
      };
      mParticle.Identity.login(identityRequest, identityCallback);
      mParticle.Identity.identify(identityRequest, identityCallback);

      currentUser = mParticle.Identity.getCurrentUser()
}

function setBalance(balance){
    document.getElementById("balance").innerHTML = balance;
}
function setnba1(nba){
    var data = "";
    switch (nba){
        case "finance":
            data = "<h3 class=\"header\">Apply for Paypal Credit</h3><p>Take advantage of special financing just for you.<img src=\"pp_credit.png\" style=\"margin:auto; margin-top: 20px; width:150px;display:block\" />";
            break;
        case "debit_card":
            data = "<h3 class=\"header\">Request a Paypal Debit Card</h3><p>Use your PayPal funds anywhere.<img src=\"pp_debit.png\" style=\"margin:auto; margin-top: 20px; width:100px;display:block\" />";
            break;
        case "send_invoice":
            data = "<h3 class=\"header\">Try Our Invoice Builder</h3><p>Easily bill clients for business transactions.";
            break;
        case "business_app":
                data = "<h3 class=\"header\">Using Paypal to Send Invoices?</h3><p>Download the Paypal Business App to manage invoices on the go.<img src=\"pp_business.png\" style=\"margin:auto; margin-top: 20px; width:70px;display:block\" />";
                break;
        case "push":
        data = "<h3 class=\"header\">Stay Informed</h3><p>Enable push notifications in your mobile app to always stay up to date.<img src=\"push.png\" style=\"margin:auto; margin-top: 20px; width:70px;display:block\" />";
        break;
        default:
                data = "<h3 class=\"header\">All Done!</h3><p>Check Back Later for Personalized Tips and Offers.<img src=\"thumbs-up.png\" style=\"margin:auto; margin-top: 20px; width:70px;display:block\" />";
    }

    openNBA("nba1", data)

}
function setAccounts(accounts){
    var data = "<h3 class=\"header\">Banks/Cards</h3><p>"+accounts[0]+"</p><p>"+accounts[1]+"</p>"
    document.getElementById("accounts").innerHTML = data;
}
function checkNBA(age){
    //alert(JSON.parse(age));
    if(parseInt(JSON.parse(age)) == 32){
        openNBA("nba1");
    }
}
function parseEventsResponse(res){
    document.getElementById("eventsinfo").innerHTML = JSON.stringify(res.records[0])

    //var mpid = JSON.stringify(res.consumer_profiles[0]["id"]);
    //getEvents(mpid)
}

//"https://cors-anywhere.herokuapp.com/https://api.mparticle.com/v1/app/5174/consumerprofile/search"
function getProfile(){
    var settings = {
    "async": true,
    "crossDomain": true,
    //"url": "https://desolate-taiga-77060.herokuapp.com/https://api.mparticle.com/v1/app/5174/consumerprofile/search",
    "url": "https://cors-anywhere.herokuapp.com/https://api.mparticle.com/v1/app/5174/consumerprofile/search",
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer N2E1MDBhNGMxYTc2OGQ0NzlkZmE4NjFjNjcwZjIyYjk.PVsysrB9",
        "Accept": "*/*",
    },
    "processData": false,
    "data": "{\r\n  \"environment\": \"development\",\r\n   \"identity\":\r\n      {\"type\":\""+idType+"\",\r\n       \"encoding\":\"none\",\r\n       \"value\":\""+idValue+"\"}\r\n}",
    }
    $.ajax(settings).done(function (response) {
    console.log(response);
    parseResponse(response);
    });

    // $.ajax(settings).fail(function (response){
    //     alert("failed")
    // });
    //getEvents()


}
function logError(){

}
function getEvents(){
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://api.mparticle.com/v1/app/4922/events/search",
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer NTFlMzFiZmE2ODVmZDk0N2FkYTFjMzRlYjNjODY1YTE.aDTZO5-z",
        "Accept": "*/*",
    },
    "processData": false,
    "data": "{\r\n  \"environment\": \"development\",\r\n\t\"user_id\": 5405022083846748486, \r\n\}"
    }

    $.ajax(settings).done(function (response) {
    console.log(response);

    parseEventsResponse(response);
    });
  }

  document.getElementById("submit").addEventListener('click', purchase);
//  document.getElementById("submit1").addEventListener('click', consent);
  document.getElementById("submit2").addEventListener('click', consent2);
