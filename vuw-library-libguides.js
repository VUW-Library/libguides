/* LibGuides 
   Description:
   This file contains base functionality for LibGuides 
   It will be loaded on each page when viewing a libguide.
   Use to add javascript support or overrides.
*/

"use strict";
var VU = VU || {};
VU.LG = {};

// SearchBar
// Description:
// This sets up and binds the events to the search box and opens results in a new window. 
(function ($) {
	VU.LG.Base = function(){
		this.init();
	}
	VU.LG.Base.prototype = {
		wordmapCurrent : null,
		
		toggleMe: function(id){
			if (id != this.wordmapCurrent){
				$("div#" + this.wordmapCurrent).stop().hide(0)	
			}
			var e=$("div#" + id); 
			if ($(e).length==0) {
				return true; 
			}
			if ($(e).css("display") == "none") {
				this.wordmapCurrent = id; 
				$(e).stop().fadeIn(500); 
			} else { 
				$(e).stop().fadeOut(250); 
			} 
			return false; 		
		},
		
		cleanWordMap: function(){
			$(".wordmap area").each(function(index, element) {
				var action = $(this).attr("onClick");
				var index1 = action.indexOf("'");
				var index2 = action.lastIndexOf("'");
				if (index1 > 0 && index2 > 0) {
					var id = action.substring(index1 + 1, index2);
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
				var id = $(this).attr("id");
				e.data.context.toggleMe(id);
			});
			
		},
		
		init: function(){
			this.cleanWordMap();
		}
	}

	$(document).ready(function () {
		new VU.LG.Base();
	})
})(jQuery);

function changeClasses(isFirstPage) {
  if (!isFirstPage) {
	$("#page-name").removeClass("make-hidden");
	$("#guide-title").removeClass("make-hidden").addClass("int-page");
	$("#left-guide-body").removeClass("make-hidden").addClass("col-md-3").addClass("s-lg-tabs-side").addClass("pad-bottom-med");
	$("#right-guide-body").removeClass("col-md-12").addClass("col-md-9");
  }
  else {
	$("#guide-title").removeClass("make-hidden");
	$("#page-name").addClass("make-hidden");
	$("#left-guide-body").addClass("make-hidden").removeClass("col-md-3").removeClass("s-lg-tabs-side").removeClass("pad-bottom-med");
	$("#right-guide-body").removeClass("col-md-9").addClass("col-md-12");
  }
};


$(document).ready(function() {
	$("#s-lg-guide-tabs li.active").parents("li").addClass("active");
	$(".list-group.s-lg-boxnav").each(function() {
		($(this).children("li").length === 1) && $(this).css("display", "none");
	});
	$("table").addClass("table-layout-ov");

	var isFirstPage = false;
	var bcItems = Array.from($("#s-lib-bc-list li")).map(function(item) {
		$(item).text().trim().toLowerCase();
	});
	console.log(bcItems);
	isFirstPage = bcItems.indexOf("home") != 0;
	changeClasses(isFirstPage);
});