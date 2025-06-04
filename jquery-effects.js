// for index.html
$(document).ready(function () {
    $(".hero-content h1").hide().fadeIn(800);
    $(".hero-content h2").hide().delay(300).fadeIn(800);
    $(".hero-content h3").hide().delay(600).fadeIn(800);
    $(".hero-content p").hide().delay(900).fadeIn(800);
    $(".movie-card-special").hide().delay(1200).fadeIn(1000);

    $(".movie-item").hover(
        function() {
            $(this).css("transform", "translateY(-5px)");
            $(this).find(".movie-poster").css("box-shadow", "0 10px 20px rgba(0,0,0,0.3)");
        },
        function() {
            $(this).css("transform", "translateY(0)");
            $(this).find(".movie-poster").css("box-shadow", "0 5px 15px rgba(0,0,0,0.2)");
        }
    );

    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    let toggleButton = $("<button>Show/Hide Features</button>");
    toggleButton.css({
        "margin": "20px auto",
        "display": "block",
        "padding": "10px 20px",
        "background-color": "#28a745",
        "color": "white",
        "border": "none",
        "border-radius": "5px",
        "cursor": "pointer",
        "transition": "all 0.3s ease"
    }).hover(
        function() {
            $(this).css("background-color", "#218838");
        },
        function() {
            $(this).css("background-color", "#28a745");
        }
    );
    
    $(".features").prepend(toggleButton);
    toggleButton.on("click", function () {
        $(".features ul").slideToggle();
    });
});

// for all
$(document).ready(function() {
    $('button').each(function(index) {
        $(this).css('position', 'relative');
        $(this).delay(100 * index).animate({
            top: '-10px'
        }, 200).animate({
            top: '0'
        }, 200);
    });

    $('.nav-links a').hover(
        function() {
            $(this).animate({ paddingLeft: '15px' }, 200);
        },
        function() {
            $(this).animate({ paddingLeft: '10px' }, 200);
        }
    );

    if (window.location.pathname.includes('trailers.html')) {
        $('.trailer-card').hide().each(function(index) {
            $(this).delay(200 * index).slideDown(600);
        });
    }

    if (window.location.pathname.includes('reviews.html')) {
        $('.card').css('opacity', 0).each(function(index) {
            $(this).delay(100 * index).animate({
                opacity: 1,
                marginLeft: '+=20'
            }, 500);
        });
    }

    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('register.html')) {
        $('.login-card, .register-card').hide().fadeIn(1000);
        $('input').focus(function() {
            $(this).parent().animate({
                borderLeftWidth: '5px'
            }, 200);
        }).blur(function() {
            $(this).parent().animate({
                borderLeftWidth: '1px'
            }, 200);
        });
    }
});