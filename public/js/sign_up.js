const validClass = "was-validated";
function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
(function ($) {
    $("#inputConfirmPassword").on("change", function() {
        var ConfPass = $(this).val();
        if (!$("#confirmPasswordField").hasClass(validClass)) {
            $("#confirmPasswordField").addClass(validClass);
        }
        if (ConfPass === null || typeof ConfPass === 'undefined' || ConfPass === ''){
            return document.getElementById("errConfirmPassword").innerHTML = "Please fill out";
        }
        var Pass = document.getElementById("inputPassword").value;
        if (Pass === null || typeof Pass === 'undefined' || Pass === "")
        {
            return document.getElementById("errConfirmPassword").innerHTML = "Please fill out Password field";
        }
        if (ConfPass !== Pass){
            document.getElementById("inputConfirmPassword").setAttribute("pattern", Pass);
            return document.getElementById("errConfirmPassword").innerHTML = "Password is not matches";
        }
    });

    $("#inputPassword").on("change", function () {
        var Pass = $(this).val();
        if (!$("#passwordField").hasClass(validClass)) {
            $("#passwordField").addClass(validClass);
        }
        if (Pass === null || typeof Pass === 'undefined' || Pass === '')
        {
            return document.getElementById("errPassword").innerHTML = "Please fill out";
        }
        var ConfPass = document.getElementById("inputConfirmPassword").value;
        if (typeof ConfPass !== 'undefined') {
            if (ConfPass !== Pass) {
                if (!$("#confirmPasswordField").hasClass(validClass)) {
                    $("#confirmPasswordField").addClass(validClass);
                }
                document.getElementById("inputConfirmPassword").setAttribute("pattern", Pass);
                return document.getElementById("errConfirmPassword").innerHTML = "Password is not matches";
            }
            else {
                document.getElementById("inputConfirmPassword").setAttribute("pattern", Pass);
            }
        }
    });

    $("#inputUsername").on("change", function () {
        var Username = $(this).val();
        if (!$("#usernameField").hasClass(validClass)) {
            $("#usernameField").addClass(validClass);
        }
        if (Username === null || typeof Username === 'undefined' || Username === '') { 
            return document.getElementById("errUsername").innerHTML = "Please fill out your username";
        }
        $.ajax({
            url: "/signup/checkinguser",
            data: {username: Username},
            type: 'POST',
            success: function(data){ 
                if (!data.is) { 
                    return document.getElementById("inputUsername").setAttribute("pattern", Username);
                }
                else { 
                    document.getElementById("inputUsername").setAttribute("pattern", "");
                    return document.getElementById("errUsername").innerHTML = "Username has exist";
                }
            }
        });
    });

    $("#inputEmailAddress").on("change", function () {
        var Email = $(this).val();
        if (!$("#emailField").hasClass(validClass)) {
            $("#emailField").addClass(validClass);
        }
        if (Email === null || typeof Email === 'undefined' || Email === '') { 
            return document.getElementById("errEmail").innerHTML = "Please fill out your email";
        }
        if (!validateEmail(Email)){
            return document.getElementById("errEmail").innerHTML = "Email is not correct";
        }
        $.ajax({
            url: "/signup/checkingemail",
            data: {email: Email},
            type: 'POST',
            success: function(data){ 
                if (!data.is) { 
                    return document.getElementById("inputEmailAddress").setAttribute("pattern", Email);
                }
                else { 
                    document.getElementById("inputEmailAddress").setAttribute("pattern", "");
                    return document.getElementById("errEmail").innerHTML = "Email has been used";
                }
            }
        });
    });

    $("#btnSignUp").on("click", function () {
        var Username = $("#inputUsername").val();
        if (Username === null || typeof Username === 'undefined' || Username === '') { 
            if (!$("#usernameField").hasClass(validClass)) {
                $("#usernameField").addClass(validClass);
            }
            document.getElementById("errUsername").innerHTML = "Please fill out your username";
        }
        var Email = $("#inputEmailAddress").val();
        if (Email === null || typeof Email === 'undefined' || Email === '') {
            if (!$("#emailField").hasClass(validClass)) {
                $("#emailField").addClass(validClass);
            } 
            document.getElementById("errEmail").innerHTML = "Please fill out your email";
        }
        var Pass = $("#inputPassword").val();
        if (Pass === null || typeof Pass === 'undefined' || Pass === '') {
            if (!$("#passwordField").hasClass(validClass)) {
                $("#passwordField").addClass(validClass);
            }
            document.getElementById("errPassword").innerHTML = "Please fill out";
        }
        var ConfPass = $("#inputConfirmPassword").val();
        if (ConfPass === null || typeof ConfPass === 'undefined' || ConfPass === ''){
            if (!$("#confirmPasswordField").hasClass(validClass)) {
                $("#confirmPasswordField").addClass(validClass);
            }
            document.getElementById("errConfirmPassword").innerHTML = "Please fill out";
        }

    });
})(jQuery);


