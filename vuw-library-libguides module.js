/* LibGuides 
   Description:
   This file contains base functionality for LibGuides 
   It will be loaded on each page when viewing a libguide.
   Use to add javascript support or overrides.
*/

"use strict";

const wordMap = function () {

    let wordmapCurrent = null;

    function toggleMe(id){
        (id != wordmapCurrent) && $("div#" + wordmapCurrent).stop().hide(0);
        let e = $("div#" + id);
        if ($(e).length===0) {
            return true; 
        }
        if ($(e).css("display") === "none") {
            wordmapCurrent = id; 
            $(e).stop().fadeIn(500); 
        } else { 
            $(e).stop().fadeOut(250); 
        } 
        return false; 		
    };

    function cleanWordMap() {
        $(".wordmap area").each(function() {
            var action = $(this).attr("onClick");
            var index1 = action.indexOf("'");
            var index2 = action.lastIndexOf("'");
            if (index1 > 0 && index2 > 0) {
                let id = action.substring(index1 + 1, index2);
                $(this).removeAttr("href");
                $(this).attr("id", id);
                $(this).removeAttr("onClick");
            }
            $(this).bind("mouseover", function(e) {
                $(this).css("cursor","pointer");	
            })
        });
        $(".wordmap area").bind("click", {context:this}, function(e){
            e.preventDefault();
            let id = $(this).attr("id");
            toggleMe(id);
        }); 
    }

    return {
        cleanWordMap: cleanWordMap
    }
};

function changeClasses(isFirstPage) {
  if (!isFirstPage) {
	$("#page-name")
		.removeClass("make-hidden");
	$("#guide-title")
		.removeClass("make-hidden")
		.addClass("int-page");
	$("#left-guide-body")
		.removeClass("make-hidden")
		.addClass("col-md-3 s-lg-tabs-side pad-bottom-med");
	$("#right-guide-body")
		.removeClass("col-md-12")
		.addClass("col-md-9");
  }
  else {
	$("#guide-title")
		.removeClass("make-hidden");
	$("#page-name")
		.addClass("make-hidden");
	$("#left-guide-body")
		.addClass("make-hidden")
		.removeClass("col-md-3 s-lg-tabs-side pad-bottom-med");
	$("#right-guide-body")
		.removeClass("col-md-9")
		.addClass("col-md-12");
  }
};

$(document).ready(function() {
    wordMap.cleanWordMap();

	$("#s-lg-guide-tabs li.active").parents("li").addClass("active");
	$(".list-group.s-lg-boxnav").each(function() {
		($(this).children("li").length === 1) && $(this).css("display", "none");
	});
	$("table").addClass("table-layout-ov");

	var isFirstPage = false;
	var bcItems = [].slice.call($("#s-lib-bc-list li")).map(function(item) {
		return item.innerText.trim().toLowerCase();
	});
	isFirstPage = bcItems.indexOf("home") != -1;
	changeClasses(isFirstPage);
});