"use strict";

const tabs = document.querySelector(`.service__tabs`);
const buttons = document.querySelectorAll('.service__tabs_title');
const contents = document.querySelectorAll('.service__content');

tabs.onclick = function (eve) {
    let target = eve.target;
    if (target.className !== 'service__tabs_title') return;
    activeTabs(target);
};

function activeTabs(li) {
    const targetLi = li;
    targetLi.classList.toggle('active');
    buttons.forEach(function (item, i) {
        if (item !== targetLi) {
            item.classList.remove('active');
        }
        if ((item.getAttribute('class')) === 'service__tabs_title active') {
            contents[i].classList.replace('hidden', 'non-hidden');
        } else {
            contents[i].classList.replace('non-hidden', 'hidden');
        }
    });
}

// --------------------------------------------------------------------------------------

const workButtons = document.querySelector(`.work__buttons_filters`);
const imagesWork = document.querySelectorAll('.work__gallery_img');
const rezerves = document.querySelectorAll('.rezerv');

document.querySelector('.work__gallery_load_more').addEventListener('click', function () {

    const height = getComputedStyle(document.querySelector('.work__gallery')).height;
    document.querySelector('.work__gallery').style.height = `${parseInt(height) + 630}px`;
    rezerves.forEach(function (item) {
        item.classList.remove('rezerv');
    });
    document.querySelector('.work__gallery_load_more').classList.add('visible');
});

workButtons.onclick = function (event) {
    let target = event.target;
    if (event.target.classList.contains('work__button')) {
        workButtons.querySelectorAll('.work__button').forEach(function (item) {
            item.classList.remove('active');
        })
        target.classList.toggle('active');
        showImage(target);
    } else {
        event.stopPropagation()
    }
};


function showImage(tab) {
    const targetClassToImg = tab.textContent.split(' ').join('_').toLowerCase();

    if (targetClassToImg !== 'all') {
        imagesWork.forEach(function (item) {
            item.classList.add('hidden');
            if (item.getAttribute('class').includes(targetClassToImg)) {
                item.classList.toggle('hidden');
            }
        });
    } else {
        imagesWork.forEach(function (item) {
            item.classList.remove('hidden');
        })
    }
}

//------------------------------------------------------------------------------------

$(document).ready(function () {
    jQuery('.work__gallery_img').hover(
        function () {
            $(this).find('.reverse_grey').fadeIn();
        },
        function () {
            $(this).find('.reverse_grey').fadeOut();
        }
    );
});


$(document).ready(function () {
    const bigimage = $("#big");
    const thumbs = $("#thumbs");
    const syncedSecondary = true;

    bigimage.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        autoHeight: true
    })
        .on("changed.owl.carousel", syncPosition);

    thumbs.on("initialized.owl.carousel", function () {
        thumbs
            .find(".owl-item")
            .eq(0)
            .addClass("current");
    })
        .owlCarousel({
            items: 4,
            dots: false,
            nav: false,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 4,
            responsiveRefreshRate: 100,
            autoHeight: true
        })
        .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        let count = el.item.count - 1;
        let current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        thumbs
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        let onscreen = thumbs.find(".owl-item.active").length - 1;
        let start = thumbs
            .find(".owl-item.active")
            .first()
            .index();
        let end = thumbs
            .find(".owl-item.active")
            .last()
            .index();
        if (current > end) {
            thumbs.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            thumbs.data("owl.carousel").to(current - onscreen, 100, true);
        }

        userProfile()
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            let number = el.item.index;
            bigimage.data("owl.carousel").to(number, 100, true);
        }
    }

    thumbs.on("click", ".owl-item", function (e) {
        e.preventDefault();
        let number = $(this).index();
        bigimage.data("owl.carousel").to(number, 300, true);
        userProfile()
    });
});

function userProfile() {
    let currentElement = document.querySelector('.current');
    let description = currentElement.querySelector('.profile__description_hidden').innerHTML;
    let name = currentElement.querySelector('.profile__name_hidden').innerHTML;
    let profession = currentElement.querySelector('.profile__profession_hidden').innerHTML;
    let insertElement = document.querySelector('.client-feed__profile');

    insertElement.querySelector('.profile_description').innerHTML = "";
    insertElement.querySelector('.profile_name').innerHTML = "";
    insertElement.querySelector('.profile_profession').innerHTML = "";
    insertElement.querySelector('.profile_description').innerHTML = `${description}`;
    insertElement.querySelector('.profile_name').innerHTML = `${name}`;
    insertElement.querySelector('.profile_profession').innerHTML = `${profession}`;
}


//======================================================
$(function () {
    let $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: '.gutter-sizer',
    });

    let $subGrid = $('.sub-grid').masonry({
        itemSelector: '.subgrid-item',
        columnWidth: 180,
        gutter: '.subgutter-sizer',
    });

    let $subGrid2 = $('.sub-grid2').masonry({
        columnWidth: 120,
        itemSelector: '.subgrid-item2',
        gutter: '.subgutter-sizer',
    });

    $grid.imagesLoaded().progress(function () {
        $grid.masonry();
    });
    $subGrid.imagesLoaded().progress(function () {
        $subGrid.masonry();
    });
    $subGrid2.imagesLoaded().progress(function () {
        $subGrid2.masonry();
    });

});


$(function() {
    const hiddenGrid = $('.grid-hidden').toArray();
    const loadMore = $('#load_gallery');
    if ($(hiddenGrid).length !== 0) {
        $("#load_gallery").show();
    }
    $(loadMore).on('click', function() {

        $(hiddenGrid).removeClass('grid-hidden').slideDown( "1000" );

        $('.grid').masonry({
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
            percentPosition: true,
            gutter: '.gutter-sizer',

        });
        if ($('.grid-hidden').toArray().length === 0) {
            $("#load_gallery").fadeOut('slow');}

    });
});


$(document).ready(function () {
    jQuery('.grid-item').hover(
        function () {
            $(this).find('.cover-item').fadeIn();
        },
        function () {
            $(this).find('.cover-item').fadeOut();
        }
    );
});

