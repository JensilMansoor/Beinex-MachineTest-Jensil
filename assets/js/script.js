// Header section starts
$(window).on("scroll", function() {
    if ($(window).scrollTop() > 151) {
        $(".bnx-header").addClass("sticky");
        $("body").addClass("sticky-soomth");
    } else {
        $(".bnx-header").removeClass("sticky");
        $("body").removeClass("sticky-soomth");
    }
});
$(".bnx-header__fade").click(function() {
    $(".bnx-header__navbar .navbar-collapse").removeClass("show");
    $("body").removeClass("overflow");
});
$(".navbar-toggler").click(function() {
    $("body").addClass("overflow");
});
$(".bnx-header__close").click(function() {
    $("body").removeClass("overflow");
});
// Header section ends

$(document).ready(function() {

    // Service tile hover
    $(".bnx-tile").hover(function() {
        let v = $(this).attr("data-id");
        $(".bnx-tile[data-id=" + v + "]").removeClass("active");
        $(this).addClass("active");
    });

    // Service slider settings
    $(".bnx-services__wrap").slick({
        dots: false,
        arrows: false,
        responsive: [{
                breakpoint: 99999,
                settings: "unslick",
            },
            {
                breakpoint: 1023,
                settings: {
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                }
            },
        ]
    });

    // News and events slider settings & Progress bar settings
    var $newsSlider = $(".bnx-news__slider");
    var $newsProgressBar = $("#newsProgress");
    var $newsProgressBarLabel = $("#newsSliderLabel");

    var $newsPagenation = $(".bnx-news__pagenation");

    $newsSlider.on("init reInit afterChange", function(event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        if (!slick.$dots) {
            return;
        }

        var i = (currentSlide ? currentSlide : 0) + 1;
        $newsPagenation.html("<span class='sgp-banner__pagenation-bold'>0" + i + "</span> / 0" + (slick.$dots[0].children.length));

    });


    $newsSlider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
        var calc = (nextSlide / (slick.slideCount - 1)) * 100;

        $newsProgressBar
            .css("background-size", calc + "% 100%")
            .attr("aria-valuenow", calc);

        $newsProgressBarLabel.text(calc + "% completed");
    });

    $newsSlider.slick({
        dots: true,
        arrows: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        speed: 300,
        infinite: true,
        slide: ".bnx-news__item",
    });

    // Footer mobile drop down setting
    $(".bnx-footer__quiklink-head").click(function() {
        $(".bnx-footer__quiklink-head").not(this).siblings().removeClass("active");
        $(this).siblings().toggleClass("active");
        
    })
    $(".bnx-footer__quiklink-head").click(function() {
        if (!$(this).hasClass("arrow")) {
            $(".bnx-footer__quiklink-head").removeClass("arrow");
        }
        $(this).toggleClass("arrow");
        
    });

});



// Email validation starts
const contactForm = document.getElementById("contactForm"),
    submitBtn = document.getElementById("submitBtn"),
    emailId = document.getElementById("emailId"),
    countryCode = document.getElementById("countryCode"),
    phoneNo = document.getElementById("phoneNo"),
    formModalClose = document.querySelector(".bnx-submit__box-close");

    let isPhoneValid = false,
    isEmailValid = false;
    
    submitBtn.setAttribute("disabled","true");

    emailId.addEventListener("keyup",checkEmailValid);
    phoneNo.addEventListener("keyup",checkPhoneValid);
    countryCode.addEventListener("change",checkPhoneValid);

    // show modal on submit
    contactForm.addEventListener("submit", function(){
        formModal.show();
    });

    function checkPhoneValid(){
        let phPattern = /[1-9]{1}[0-9]{9}/;
        if(phoneNo.value.length > 10) {
            phoneNo.value = phoneNo.value.substr(0, 10);
        }
        if (!(phPattern.test(phoneNo.value)) || (phoneNo.value == "") || (phoneNo.value.length != 10) || countryCode.value == "") {
            phoneNo.classList.add("error");
            isPhoneValid = false;
        }
        else {
            phoneNo.classList.remove("error");
            isPhoneValid = true;
        }
        checkSubmitStatus();
    }

    function checkEmailValid() {
        let emailIdvalue = emailId.value.includes("@beinex.com");
        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(emailPattern.test(emailId.value)) || emailId.value == "" || emailId.value == null || (emailIdvalue == false)) {
            emailId.classList.add("error");
            sEmailValid = false;
        }
        else {
            emailId.classList.remove("error");
            isEmailValid = true;
        }
        checkSubmitStatus();
    }
    function checkSubmitStatus(){
        if(isEmailValid && isPhoneValid){
            submitBtn.removeAttribute("disabled");
        }
        else{
            submitBtn.setAttribute("disabled","true");
        }
    }
// Email validation ends

//Popup submit mbutton modal starts
const submitModal = document.querySelector("[data-modal]");
submitBtn.addEventListener("click", function(e) {
    e.preventDefault();
    submitModal.classList.add("active");
    document.querySelector("body").classList.add("overflow");
    
});
submitModal.addEventListener("click", function() {
    submitModalClose();
});
formModalClose.addEventListener("click", function() {
    submitModalClose();
});
document.querySelector(".bnx-submit__box").addEventListener('click', function(e){
    e.stopPropagation();
});

function submitModalClose(){
    if (submitModal.classList.contains("active")) {
        submitModal.classList.remove("active");
        document.querySelector("body").classList.remove("overflow");
    }
}
//Popup submit mbutton modal ends    
    