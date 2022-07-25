function scrollToSection(element) {
    $("html, body").animate({
        scrollTop: $(element).offset().top
    }, 1000);
};

function showServices(serviceId, serviceTitleId) {
    if (serviceId === "all") {
        $(".service-item, .servicesThumbnails").show(400);
    } else {
        $(".service-item, .servicesThumbnails").hide(400);
        $("#" + serviceId + ", ." + serviceId).show(400);
    }

    $(".list-service-titles").removeClass("active");
    $("#" + serviceTitleId).addClass("active");
}

function elementIsInViewport(element) {
    return ($(window).scrollTop() - $(element).offset().top - $(element).height() < 0);
}

$(window).on("scroll", function () {
    if (elementIsInViewport("#homeLogo")) {
        $("#navbarLogo").hide(1000);
    } else {
        $("#navbarLogo").show(1000);
    }
});

if (!elementIsInViewport("#homeLogo")) {
    $("#navbarLogo").show();
}

$(".nav-link").on("click", function () {
    var sectionTo = $(this).attr("href");
    scrollToSection(sectionTo);
});

$("#contactForm").on("submit", (evt) => {
    evt.preventDefault();

    $.ajax({
        method: "POST",
        dataType : "json",
        headers: {
            "Access-Control-Allow-Origin": "https://www.logoscode.com.mx",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "x-api-key": "uyfjm8fJRw7tjS0ebcFPm7H9RcG0VgIh9nkgRzVa"
        },
        crossDomain: true,
        url: "https://landing-contact-email.logoscode.com.mx/send",
        data: {
            name: $("#contactName").val(),
            email: $("#contactEmail").val(),
            cellphone: $("#contactCellphone").val(),
            message: $("#contactMessage").val()
        }
    }).done((data, textStatus, jqXHR) => {
        console.log(data, textStatus, jqXHR);
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log(jqXHR, textStatus, errorThrown);
    }).always(() => {
        document.getElementById("contactForm").reset();

        $("#contactForm").notify("Gracias por tu mensaje", { position: "top center", className: "success" });
    });
});
