// @ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
    var body = document.getElementsByTagName("body")[0];
    body.className = "clean-jsdoc-custom";

    // if (OverlayScrollbars !== undefined) {
    //     OverlayScrollbars(document.querySelector(".sidebar-list-div"), {
    //         theme: "os-theme-light"
    //     });
    // }
});

$(document).ready(function () {
    var sidebarList = $(".sidebar-list-div");
    var sideBarGroups = $(".sidebar-list-div > ul > ul");
    var sideBarGroupItems = $(".sidebar-list-div > ul > li");
    var sideBarGroupsName = $(".sidebar-list-div > ul > li > a");

    sideBarGroupsName.wrap("<div class='group-title'></div>");

    sideBarGroupItems.each(function() {
        var curr = $(this);
        var groupTitle = curr.find(".group-title");
        var methods = groupTitle.next("ul.methods");
        
        methods.toggle();

        if (methods.length != 0){
            groupTitle.append("<div class='show-content'>-</div>");
            
            var showContent = groupTitle.find(".show-content");

            showContent.click(function () {
                var text = $(this).text();

                methods.toggle();
                
                if (text == "+"){
                    $(this).text("-");
                }
                else{
                    $(this).text("+");
                }
            });
        }
    });
})