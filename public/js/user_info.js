const validClass = "was-validated";
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
var userBackup;
var newUser;
(function($) {
    var emailValid = true;
    $(document).on("ready", function(){
        $.ajax({
            url: "/user/getinfo",
            type: "POST",
            success:function(data){
                userBackup = data;
                newUser = data;
                $("#username").val(userBackup.username);
                $("#fullname").val(userBackup.fullname);
                $("#email").val(userBackup.email);
                $("#birthday").val(userBackup.birthday);
                $("#address").val(userBackup.address);
                if (userBackup.gender === female){
                    $("#female").prop("checked", true);
                }
                else {
                    $("#male").prop("checked", true);
                }
            }
        })
    });
    $("#userform").on("submit", function(event) {
        event.preventDefault();
    });
    $("#email").on("change", function(){
        var email = $(this).val();
        if (email === "" || email === null) {
            return $(this).val(userBackup.email);
        }
        if (email === userBackup.email) {
            emailValid = true;
            return;
        }
        if (!$(this).hasClass(validClass)){
            $(this).addClass(validClass);
        }
        if (!validateEmail(email)){
            $(this).prop("pattern","");
            emailValid = false;
            return $("#emailErr").text("Email is invalid");
        }
        $.ajax({
            url: "/checkemail",
            data: {email: $(this).val()},
            success: function(data){
                if (!data.is){
                    emailValid = false;
                    return $("#emailErr").text("Email has been used");
                }
                emailValid = true;
                return $(this).prop("pattern", email);
            }
        });
        if (emailValid){
            var btnSave = $("#btnSave");
            if (btnSave.prop("disabled")){
                btnSave.prop("disabled", false);
            }
        }
    });
    $("#fullname").on("change", function(){
        if ($(this).val() !== userBackup.fullname) {
            if (emailValid){
                var btnSave = $("#btnSave");
                if (btnSave.prop("disabled")){
                    btnSave.prop("disabled", false);
                }
            }
        }
        else {
            if ($(this).val() === null) {
                $(this).val(userBackup.fullname)
            }
        }
    });
    $("#birthday").on("change", function(){
        if ($(this).val() !== userBackup.birthday) {
            if (emailValid){
                var btnSave = $("#btnSave");
                if (btnSave.prop("disabled")){
                    btnSave.prop("disabled", false);
                }
            }
        }
        else {
            if ($(this).val() === null) {
                $(this).val(userBackup.birthday)
            }
        }
    });
    $("#address").on("change", function(){
        if ($(this).val() !== userBackup.address) {
            if (emailValid){
                var btnSave = $("#btnSave");
                if (btnSave.prop("disabled")){
                    btnSave.prop("disabled", false);
                }
            }
        }
        else {
            if ($(this).val() === null) {
                $(this).val(userBackup.address)
            }
        }
    });
    $("#female").on("click",function(){
        if ($(this).prop("checked")) {
            if (userbackup.gender !== "female") {
                if (emailValid){
                    var btnSave = $("#btnSave");
                    if (btnSave.prop("disabled")){
                        btnSave.prop("disabled", false);
                    }
                }
            }
        }
    });
    $("#male").on("click",function(){
        if ($(this).prop("checked")) {
            if (userbackup.gender !== "male") {
                var btnSave = $("#btnSave");
                if (btnSave.prop("disabled")){
                    btnSave.prop("disabled", false);
                } 
            }
        }
    });
    $(btnSave).on("click",function(){
        var gender = "female";
        if ($("#male").prop("checked")) {
            gender = "male";
        }
        var usernew ={
            username: $("#username").val(),
            email: $("#email").val(),
            birthday: $("#birthday").val(),
            fullname: $("#fullname").val(),
            address: $("#address").val(),
            gender: gender
        }
        $.ajax({
            url: "user/changinginfo",
            type: "POST",
            data: {newuser: newuser},
            success: function(data){
                if (data){
                    userbackup = newuser;
                    alert("Your information is successfully changed.");
                }
                else{
                    alert("Your information is unsuccessfully changed.");
                }
                
            }
        })
    })
})(jQuery)