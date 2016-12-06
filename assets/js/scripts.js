"use strict";

$(function() {

    var $navDisplayer = $('.js-header-nav-displayer').first();
    var $navDisplayable = $('.js-header-nav-displayable').first();

    if(($navDisplayer.length === 0) || ($navDisplayable.length === 0)) {
        return;
    }

    $navDisplayable.addClass('is-closed');

    var opened = false;
    $navDisplayer.bind('touchstart click', function(){

        if (!opened) {
            opened = true;
            setTimeout(function() {
                opened = false;
            }, 100);

            $navDisplayable.toggleClass('is-closed');
            $navDisplayer.toggleClass('is-opened');
        }

        return false
    });

}());
;$(document).ready(function() {
    $('.js-scrollTo').on('click', function() { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 750; // Durée de l'animation (en ms)
        $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
        return false;
    });
});
