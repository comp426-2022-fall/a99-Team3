window.addEventListener("load", function () {
    
    var isLogIn;
    var current = null;

    // Hide and show elements based on login status
    function hideElements(){
        document.getElementById("begin").style.display="None";
        document.getElementById("dataPlace").style.display="None";
        document.getElementById("updateForm").style.display="None";
        document.getElementById("deleteAcc").style.display="None";
    }
    function showElements(){
        document.getElementById("begin").style.display="block";
        document.getElementById("dataPlace").style.display="block";
        document.getElementById("updateForm").style.display="block";
        document.getElementById("deleteAcc").style.display="block";
    }

    // Remove this line to show elements at start before login during testing
    hideElements();
    
    // Hide login form after log in
    function hideLogin() {
        document.getElementById("logUser").style.display = "None";
        document.getElementById("logPass").style.display = "None";
    }
    // Show login for after log out
    function showLogin() {
        document.getElementById("logUser").style.display = "block";
        document.getElementById("logPass").style.display = "block";
    }

    // New User Creation after submit the form
    function sendData() {
        const XHR = new XMLHttpRequest();
              FD = new URLSearchParams(new FormData( form ));

        // Define what happens on successful data submission
        XHR.addEventListener( 'load', function( event ) {
            alert( 'Yeah! Data sent!' );
        } );

        // Define what happens in case of error
        XHR.addEventListener('error', function( event ) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open("POST", "http://localhost:8888/app/new/user");
        XHR.send( FD );
    }

    // After submit the form, call sendData()
    const form = document.getElementById("myForm");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        sendData();
    });

    // Login
    function checkLog( form ) {      
    const sendRequest = new XMLHttpRequest();
    const userInfo = new URLSearchParams(new FormData( form ));

    sendRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            current = JSON.parse(sendRequest.response);
            if(isLogIn){
                current = null;
                isLogIn = false;
                document.getElementById("login").value = "Login";

                hideElements()
                alert("Successfully logged out");
            } else { 
                document.getElementById("login").value = "Logout";
                isLogIn = true;

                showElements();
                alert("Login successful!")
                hideLogin();
            }
        } else if ( this.status != 200 ) {
            alert("Bad Credential! (If Login successful message pop up next, you are good to go!)")
        }
       
    }
    sendRequest.open("POST", "http://localhost:8888/app/login/user");
    sendRequest.send( userInfo );
};

const selfUser = document.getElementById("loginForm");
    selfUser.addEventListener("submit", function(event){
        event.preventDefault();
        if(isLogIn){

            alert("Logged Out");
            hideElements()
            current = null;
            isLogIn = false;
            document.getElementById("login").value = "Login";
            this.reset();
            showLogin();

        } else {
            checkLog(this);
        }
    });

    // Delete User
    function deleteUser(form) {
        const XHR = new XMLHttpRequest();
        var FD = new URLSearchParams(new FormData( form ));
        FD.append('user', current.user);

        XHR.addEventListener("load", function(event){
            alert('Account Deleted!');
        });

        XHR.open("DELETE", "http://localhost:8888/app/delete/user");
        XHR.send( FD );

    }

    const deleted = document.getElementById("deleteAcc");
    deleted.addEventListener("submit", function(event) {    
        event.preventDefault();
        deleteUser(this);
    });

    // Updating User Info
    function updateInfo( form ) {
        const XHR = new XMLHttpRequest();
        var FD = new URLSearchParams(new FormData( form ));

        FD.append('user', current.user);

        XHR.addEventListener("load", function(event){
            alert('Info Updated!');
        });

        XHR.open("PATCH", "http://localhost:8888/app/update/user");
        XHR.send( FD );
    }

    const newData = document.getElementById("updateinfo");
    newData.addEventListener("submit", function(event){
        event.preventDefault();
        updateInfo(this);
    });

    // Show Profile
    const showData = document.getElementById("showData");
    showData.addEventListener("click", function(event){
        event.preventDefault();
        if(loggedIn){
            document.getElementById("profileData").innerHTML = `Username: ${current.user}, 
            Email: ${current.email}, 
            Name: ${current.name}`
        } else {
            alert("You must log in to see profile!")
        }
    });

});    