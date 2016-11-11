var spinner;
var fx = true;
var canvas;
var context;
var RADIUS = 205;
var RADIUS_SCALE = 1;
var RADIUS_SCALE_MIN = 1;
var RADIUS_SCALE_MAX = 1;
var QUANTITY = 40;
var particles;
var mouseX = 50;
var mouseY = 50;
var timeout = 0;
var looping = 0;
var erasingTotal = 3000;
var erasingCounter = 0;
var stopped = true;
var overThumb = false;
var prevMouseX, prevMouseY;
var prevScroll = 0;
var page = "home";
$(document).ready(function() {
	jQuery.extend(jQuery.browser, { SafariMobile: navigator.userAgent.toLowerCase().match(/iP(hone|ad|od)/i) });
    jQuery.extend(jQuery.browser, { iPhone: navigator.userAgent.toLowerCase().match(/iPhone/i) });
    if ($.browser.SafariMobile) { toggleFx() }
    if ($.browser.SafariMobile) { $("html").attr("class", "iphone") }
    $("div#preloader").css("height", $(document).height());
    $.fn.spin = function(d) { this.each(function() {
            var e = $(this),
                f = e.data("spinner");
            if (f) { f.stop() }
            if (d !== false) { d = $.extend({ color: e.css("color") }, d);
                f = new Spinner(d).spin(this);
                e.data("spinner", f) } });
        return this };
    var b = { lines: 10, length: 0, width: 20, radius: 0, color: "#353535", speed: 1.6, trail: 63, shadow: false };
    var c = document.getElementById("preloader");
    spinner = new Spinner(b).spin(c);
    $(spinner.el).css("left", window.innerWidth * 0.5);
    $(spinner.el).css("top", (window.innerHeight - $(window).scrollTop()) * 0.5);
    window.addEventListener("resize", a, false);

    function a() {
        if ($("div#preloader").css("display") != "none") { $(spinner.el).css("left", window.innerWidth * 0.5);
            $(spinner.el).css("top", (window.innerHeight - $(window).scrollTop()) * 0.5);
            return } }
});
$(window).load(function() {
	$("nav#nav #nav_projects").css("pointer-events", "none");
    $("nav#nav #nav_projects").css("cursor", "default");
    $("nav#nav #nav_projects").css("opacity", "0.2");
    $(".projectThumbnail").each(function() {
        var n = $(this);
        n.css({ position: "absolute" }).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass("img_grayscale").css({ position: "absolute", "z-index": "998", opacity: "0" }).insertBefore(n).queue(function() {
            var o = $(this);
            o.parent().css({ width: this.width, height: this.height });
            o.dequeue() });
        // this.src = d(this.src);
        Caman(this, function () {
            // this.brightness(10);
            this.contrast(15);
            this.exposure(20);
            this.saturation(-100);
            this.render();
        });
    });
        
    $(".projectPreview").click(f);

    function l() { overThumb = false;
        $("#upLink").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $("#upLink").css("display", "none") });
        $("section#screens ul").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $("section#works").css("height", "auto");
            $("section#screens ul li").each(function() { $(this).css("display", "none") }) });
        $("section#works ul").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $("#backLink").css("display", "none");
            $(".projectPreview").each(function() { $(this).css("display", "block") });
            $(window).scrollTop(prevScroll);
            $("section#works").css("width", "75%");
            page = "home";
            e();
            overThumb = true;
            mouseX = prevMouseX;
            mouseY = prevMouseY;
            $("section#works ul").animate({ opacity: 1 }, 500, "easeOutQuint", function() {}) }) }

    function f() {
        var p = $(this);
        var o = $(this).attr("id");
        var n = $(this).attr("id").split("_")[1];
        prevMouseX = $(this).offset().left + $(this).width() * 0.5;
        prevMouseY = $(this).offset().top - $(window).scrollTop() + $(this).height() * 0.5;
        prevScroll = $(window).scrollTop();
        recordOutboundLink(this, "Projects", n);
        page = "project";
        $("section#works ul").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $(".projectPreview").each(function() { $(this).css("display", "none") });
            $("#backLink").css("display", "block");
            $("section#works").css("left", "30px");
            $("section#works").css("width", "250px");
            overThumb = true;
            mouseX = $("#backImg").offset().left + $("#backImg").width() * 0.5;
            mouseY = $("#backImg").offset().top - $(window).scrollTop() + $("#backImg").height() * 0.5;
            $("section#works ul").animate({ opacity: 1 }, 500, "easeOutQuint", function() { overThumb = false;
                $("section#screens ul li").each(function() {
                    if ($(this).attr("id") != "project_" + n) { $(this).css("display", "none") } else { $(this).css("display", "block") } });
                $("section#works").css("height", $("section#screens").height());
                if ($(document).height() > $(window).height() + 400) { $("#upLink").css("display", "block");
                    $("#upLink").animate({ opacity: 1 }, 500, "easeOutQuint") }
                $("section#screens ul").animate({ opacity: 1 }, 500, "easeOutQuint") }) }) }

    function g() { overThumb = false;
        a();
        $("nav#nav #nav_about").css("pointer-events", "none");
        $("nav#nav #nav_about").css("cursor", "default");
        $("nav#nav #nav_about").animate({ opacity: 0.2 }, 500, "easeOutQuint");
        $("nav#nav #nav_projects").css("pointer-events", "auto");
        $("nav#nav #nav_projects").css("cursor", "auto");
        $("nav#nav #nav_projects").animate({ opacity: 1 }, 500, "easeOutQuint");
        if (page == "project") { $("section#screens ul").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $("section#screens ul").css("display", "none") });
            if ($("#upLink").css("display") == "block") { $("#upLink").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $("#upLink").css("display", "none") }) } }
        $("section#works").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $("section#works").css("display", "none");
            $("section#about").css("display", "block");
            $("section#about").animate({ opacity: 1 }, 500, "easeOutQuint") }) }

    function b() { $("nav#nav #nav_about").css("pointer-events", "auto");
        $("nav#nav #nav_about").css("cursor", "auto");
        $("nav#nav #nav_about").animate({ opacity: 1 }, 500, "easeOutQuint");
        $("nav#nav #nav_projects").css("pointer-events", "none");
        $("nav#nav #nav_projects").css("cursor", "default");
        $("nav#nav #nav_projects").animate({ opacity: 0.2 }, 500, "easeOutQuint");
        $("section#about").animate({ opacity: 0 }, 500, "easeOutQuint", function() { $("section#about").css("display", "none");
            $("section#works").css("display", "block");
            $("section#works").animate({ opacity: 1 }, 500, "easeOutQuint", function() {
                if (page == "project") { $("section#screens ul").css("display", "block");
                    $("section#screens ul").animate({ opacity: 1 }, 500, "easeOutQuint");
                    if ($("#upLink").css("display") == "none" && $(document).height() > $(window).height() + 400) { $("#upLink").css("display", "block");
                        $("#upLink").animate({ opacity: 1 }, 500, "easeOutQuint") } } }) }) }
    $(window).scroll(function() { overThumb = false;
        a() });
    $(".projectThumbnail").mouseover(function() { $(this).parent().find("img:first").stop().animate({ opacity: 1 }, 500);
		$(this).parent().parent().find(".projectDetails").removeClass('wNormal');
    	$(this).parent().parent().find(".projectDetails").addClass('wHover');
        overThumb = true;
        mouseX = $(this).offset().left + $(this).width() * 0.5;
        mouseY = $(this).offset().top - $(window).scrollTop() + $(this).height() * 0.5 });
    $(".projectThumbnail").mouseout(function() { $(this).stop().animate({ opacity: 0 }, 500);
    	$(this).parent().parent().find(".projectDetails").removeClass('wHover');
		$(this).parent().parent().find(".projectDetails").addClass('wNormal');
        overThumb = false });
    $("#backImg").mouseover(function() { overThumb = true;
        mouseX = $(this).offset().left + $(this).width() * 0.5;
        mouseY = $(this).offset().top - $(window).scrollTop() + $(this).height() * 0.5 });
    $("#backImg").mouseout(function() { overThumb = false });
    $("#upImg").mouseover(function() { overThumb = true;
        mouseX = $(this).offset().left + $(this).width() * 0.5;
        mouseY = $(this).offset().top - $(window).scrollTop() + $(this).height() * 0.5 });
    $("#upImg").mouseout(function() { overThumb = false });
    $("#fxToggle").click(toggleFx);
    $("#backLink").click(l);
    $("#nav #nav_about a").attr("href", "#");
    $("#nav #nav_about a").click(g);
    $("#nav #nav_projects a").attr("href", "#");
    $("#nav #nav_projects a").click(b);

    function m() {
        if (jQuery.browser.mozilla && jQuery.browser.version.slice(0, 3) == "1.9") { $(".projectThumbnail").each(function(n) { $(this).css("background-image", "url(" + $(this).attr("src") + ")");
                $(this).attr("src", "");
                $(this).attr("alt", "") }) }
        $("html").css("display", "block");
        canvas = document.getElementById("bkgd");
        if (canvas != undefined) { context = canvas.getContext("2d");
            e() } }
    spinner.stop();
    m();
    $("div#preloader").animate({ opacity: 0 }, 2400, "linear", function() { $("div#preloader").css("display", "none");
        $("html").css("overflow-y", "auto");
        if (canvas != undefined) { window.addEventListener("resize", e, false);
            h();
            document.addEventListener("mousemove", c, false) } });

    function e() { canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (page == "project") {
            return }
        var p = window.innerWidth * 0.75;
        var o = Math.floor(p / 220);
        var n = (o == 1) ? 200 : (o - 1) * 220 + 200;
        $("section#works").css("left", (window.innerWidth - n) * 0.5) }

    function c(n) {
        if (!fx) {
            return }
        stopped = false;
        if (looping <= 0 && overThumb) { looping = setInterval(j, 40) }
        if (!overThumb) { stopped = true }
        clearTimeout(timeout);
        timeout = setTimeout(function() { stopped = true }, 3000) }

    function h() { particles = [];
        var n = 20;
        for (var o = 0; o < QUANTITY; o++) {
            var p = { position: { x: mouseX, y: mouseY }, shift: { x: mouseX, y: mouseY }, size: 0.2, angle: 0, speed: 0.01 + Math.random() * 1, targetSize: 0.2, fillColor: "rgba(" + n + ", " + n + ", " + n + ", 1.0)", orbit: RADIUS * 0.5 };
            particles.push(p) } }

    function a() { stopped = true;
        var n = 0;
        clearInterval(looping);
        looping = 0;
        context.globalCompositeOperation = "destination-out";
        context.fillStyle = "rgba(239,239,239,1.0)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        n++ }

    function j() { RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);
        context.globalCompositeOperation = "destination-out";
        context.fillStyle = "rgba(235,235,235,0.17)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        if (stopped == true) { context.globalCompositeOperation = "lighter";
            context.fillStyle = "rgba(239,239,239,0.1)";
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            erasingCounter += 40;
            if (erasingCounter >= erasingTotal) { clearInterval(looping);
                looping = 0;
                erasingCounter = 0 }
            return }
        for (i = 0, len = particles.length; i < len; i++) {
            var o = particles[i];
            var n = { x: o.position.x, y: o.position.y };
            o.angle += o.speed;
            o.shift.x += (mouseX - o.shift.x) * (o.speed);
            o.shift.y += (mouseY - o.shift.y) * (o.speed);
            o.position.x = o.shift.x + Math.cos(i + o.angle) * (o.orbit * RADIUS_SCALE);
            o.position.y = o.shift.y + Math.sin(i + o.angle) * (o.orbit * RADIUS_SCALE);
            o.position.x = Math.max(Math.min(o.position.x, canvas.width), 0);
            o.position.y = Math.max(Math.min(o.position.y, canvas.height), 0);
            o.size += (o.targetSize - o.size) * 0.05;
            context.globalCompositeOperation = "source-over";
            context.beginPath();
            context.fillStyle = o.fillColor;
            context.strokeStyle = o.fillColor;
            context.lineWidth = o.size;
            context.moveTo((0.5 + n.x) | 0, (0.5 + n.y) | 0);
            context.lineTo((0.5 + o.position.x) | 0, (0.5 + o.position.y) | 0);
            context.stroke();
            context.arc((0.5 + o.position.x) | 0, (0.5 + o.position.y) | 0, o.size / 2, 0, Math.PI * 2, true);
            context.fill() } }

    function d(n) {
        var p = document.createElement("canvas");
        var v = p.getContext("2d");
        var q = new Image();
        q.src = n;
        p.width = q.width;
        p.height = q.height;
        v.drawImage(q, 0, 0);
        var o = v.getImageData(0, 0, p.width, p.height);
        o = k(o, 100, -50);
        for (var t = 0; t < o.height; t++) {
            for (var u = 0; u < o.width; u++) {
                var r = (t * 4) * o.width + u * 4;
                var s = (o.data[r] + o.data[r + 1] + o.data[r + 2]) / 3;
                o.data[r] = s;
                o.data[r + 1] = s;
                o.data[r + 2] = s } }
        v.putImageData(o, 0, 0, 0, 0, o.width, o.height);
        return p.toDataURL() }

    function k(s, n, p) {
        var r = s.data;
        for (var o = 0; o < r.length; o += 4) { r[o] = q(r[o], 0.2, 0.25);
            r[o + 1] = q(r[o], 0.2, 0.25);
            r[o + 2] = q(r[o], 0.2, 0.25) }

        function q(u, v, t) { u = u / 255;
            if (v < 0) { u = u * (1 + v) } else { u = u + ((1 - u) * v) }
            u = (u - 0.5) * (Math.tan((t + 1) * Math.PI / 4)) + 0.5;
            return u * 255 }
        return s } });

function toggleFx() { fx = !fx;
    $("#bkgd").css("display", (!fx) ? "none" : "block");
    $("#fxToggle a").text((fx) ? "fx enabled" : "fx disabled") };