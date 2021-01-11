const validClass = "was-validated";
(function($) {
    $("#confirmNewPassword").on("change", function(){
        if (!$(this).hasClass(validClass)) {
            $(this).addClass(validClass);
        }
        if ($(this).val() === null || $(this).val() === ""){

        }
    });
})(jQuery)