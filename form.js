window.addEventListener("load", function () {
    
    var thisUser = null;
    var loggedIn;

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
    function sendData( form ) {
        const sendRequest = new XMLHttpRequest();
        const signupInfo = new URLSearchParams(new FormData( form ));
        // in case of error
        sendRequest.addEventListener("error", function(event){
            alert('Something went wrong. Please try again.');
        });
        // successful data submission
        sendRequest.addEventListener("load", function(event){
            alert('Your account was created!');
        });
        sendRequest.open("POST", "http://localhost:8888/app/new/user");
        sendRequest.send( signupInfo );
    }

    // After submit the form, call sendData()
    const form = document.getElementById("myForm");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        sendData();
    });

   // Login
   function getUserdata( form ) {
    const sendRequest = new XMLHttpRequest();
    const userInfo = new URLSearchParams(new FormData( form ));
    sendRequest.addEventListener("error", function(event){
        alert('Accessing users unsuccessful! Please try again.');
    });

    sendRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            thisUser = JSON.parse(sendRequest.response);
            if(loggedIn){
                thisUser = null;
                loggedIn = false;
                document.getElementById("login").value = "Login";
                document.getElementById("greeting").innerHTML = thisUser;
                // document.getElementById("loggedInUser").classList.add("hide-on-logout");
                hideElements()
                alert("Logging Out");
            } else {
                if(thisUser.name == null | thisUser.name == ""){
                    document.getElementById("greeting").innerHTML = "Welcome to Fortune Cookie, " + thisUser.user;
                } else {
                    document.getElementById("greeting").innerHTML = "Welcome to Fortune Cookie, " + thisUser.name;
                };
                document.getElementById("login").value = "Logout";
                loggedIn = true;
                // document.getElementById("loggedInUser").style.display = "block";
                // document.getElementById("loggedInUser").classList.remove("hide-on-logout");
                showElements();
                alert("Login successful!")
            }
        }
    }
    sendRequest.open("POST", "http://localhost:8888/app/login/user");
    sendRequest.send( userInfo );
};

const selfUser = document.getElementById("loginForm");
selfUser.addEventListener("submit", function(event){
    event.preventDefault();
    if(loggedIn){
        alert("Logging Out");
        // document.getElementById("loggedInUser").classList.add("hide-on-logout");
        hideElements()
        thisUser = null;
        loggedIn = false;
        document.getElementById("login").value = "Login";
        document.getElementById("greeting").innerHTML = thisUser;
        this.reset();
    } else {
        getUserdata(this);
    }
});

    // Delete User
    function deleteData( form ) {
        var deletePassword = form.pass.value;
        let deleteInfo = new URLSearchParams("");
        deleteInfo.append('user', thisUser.user);
        deleteInfo.append('pass', deletePassword);
        const sendRequest = new XMLHttpRequest();
        sendRequest.addEventListener("error", function(event){
            alert('Deletion unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function(event){
            alert('Your account was successfully deleted!');
        });

        sendRequest.open("DELETE", "http://localhost:8888/app/deleting/user");
        sendRequest.send( deleteInfo );
    }

    const olduser = document.getElementById("delete");
    olduser.addEventListener("submit", function(event){
        event.preventDefault();
        deleteData(this);
    });

    // Updating User
    function updateData( form ) {
        const sendRequest = new XMLHttpRequest();
        var updateInfo = new URLSearchParams(new FormData( form ));
        updateInfo.append('user', thisUser.user);
        sendRequest.addEventListener("error", function(event){
            alert('Update unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function(event){
            // alert('Your username was changed!');
        });
        sendRequest.open("PATCH", "http://localhost:8888/app/updating/user");
        sendRequest.send( updateInfo );
    }

    const updateUser = document.getElementById("changeName");
    updateUser.addEventListener("submit", function(event){
        event.preventDefault();
        updateData(this);
    });

    // Show Profile
    const showData = document.getElementById("showData");
    showData.addEventListener("click", function(event){
        event.preventDefault();
        if(loggedIn){
            document.getElementById("profileData").innerHTML = `Username: ${thisUser.user}, 
            Email: ${thisUser.email}, 
            Name: ${thisUser.name},
            Year: ${thisUser.year}`
        } else {
            alert("You must log in to see profile!")
        }
    });


    // retrieve the highest score from database
    function getLuckiest( form ) {
        const sendRequest = new XMLHttpRequest();
        sendRequest.addEventListener("error", function(event){
            alert('retrieving score unsuccessful! Please try again.');
        });

        sendRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // alert(sendRequest.responseText);
                document.getElementById("showScore").innerHTML = sendRequest.responseText;
            }
        }
        sendRequest.open("GET", "http://localhost:8888/app/user/highest");
        sendRequest.send(); 
    }
    // when click "show luckiest" button, do getLuckiest()
    const getScore = document.getElementById("highestScore");
    getScore.addEventListener("click", function(event){
        event.preventDefault();
        getLuckiest(this)        
    });

});    