const validClass = "was-validated";
(function($) {
    $("#confirmNewPassword").on("change", function(){
        if (!$(this).hasClass(validClass)) {
            $(this).addClass(validClass);
        }
        if ($(this).val() === null || $(this).val() === ""){
            return $("#confirmNewPasswordErr").text("Please fill out");
        }
        $("this").prop("pattern", $("#newPassword").val());
        if ($("#newPassword").val() !== $(this).val() && $("#newPassword").val() !== "") {
            return $("#confirmNewPasswordErr").text("Password is mismatched");
        }
    });
    $("#newPassword").on("change", function() {
        if (!$(this).hasClass(validClass)) {
            $(this).addClass(validClass);
        }
        if ($(this).val() === null || $(this).val() === ""){
            return $("#newPasswordErr").text("Please fill out");
        }
        $("#confirmNewPassword").prop("pattern", $(this).val());
        if ($("#confirmNewPassword").val() !== $(this).val() && $("#confirmNewPassword").val() !== "") {
            return $("#confirmNewPasswordErr").text("Password is mismatched");
        }
    });
    $("#myForm").on("submit", function(event){
        event.preventDefault();
    });
    $("#btnChange").on("click", function(){
        $.ajax({
            url: "/user/changingpass",
            type: "POST",
            data:{
                oldPass: $("#oldPassword").val(),
                newpass: $("#newPassword").val()
            },
            success: function(data) {
                alert(data);
            }
        });
    })
})(jQuery)