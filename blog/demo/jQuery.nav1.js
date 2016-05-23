; (function ($) {
    $.fn.extend({
        "nav": function (color) {
            $(this).find('.nav').addClass('hover').css("color", color);
            $(this).find('.nav').parent().hover(
                function () {
                    $(this).find(".nav").stop().slideDown("normal")
                }, function () {
                    $(this).find(".nav").stop().slideUp("normal");
                }
                );
        }
    });
})(jQuery);