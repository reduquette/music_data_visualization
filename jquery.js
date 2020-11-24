jQuery(document).ready(function($) {

    $.scrollify({
            section : ".section-class-name",
            sectionName : "section-name",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset : 0,
            scrollbars: true,
            standardScrollElements: "",
            setHeights: true,
            before:function() {},
            after:function() {},
            afterResize:function() {},
            afterRender:function() {}
        });
    })