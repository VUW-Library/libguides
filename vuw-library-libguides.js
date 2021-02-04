/* LibGuides 
   Description:
   This file contains base functionality for LibGuides 
   It will be loaded on each page when viewing a libguide.
   Use to add javascript support or overrides.
*/

var VU = VU || {};
VU.LG = {};

// SearchBar
// Description:
// This sets up and binds the events to the search box and opens results in a new window. 
(function ($) {
	VU.LG.Base = function(){
		"use strict";
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
		"use strict";
		$("#s-lg-guide-tabs li.active").parents("li").addClass("active");
		$(".list-group.s-lg-boxnav").each(function(index, element) {
			if($(this).children("li").length === 1) {
				$(this).css("display", "none");	
			}
		});
		(new VU.LG.Base());
	})
})(jQuery);


$(document).ready(function() {
	var tables = $("table"); 
	console.log("_-----" + tables.length);
	tables.forEach(function(table, i){
		console.log('_-----' + i);
		table.addClass("table-layout-ov");
	});

  console.log("_+_+_+");
  var isFirstPage = false;
  var bcItems = $("#s-lib-bc-list li").map(function(item) {
	item.text().trim().toLowerCase();
  });
	if (bcItems.indexOf("home") === 0) {
	  isFirstPage = true;
	}
  changeClasses(isFirstPage);
});

function changeClasses(isFirstPage) {
  if (!isFirstPage) {
	$("#left-guide-body").removeClass("make-hidden");
	$("#page-name").removeClass("make-hidden");
	$("#guide-title").removeAttribute("class");
	console.log("Class List : " + $("#guide-title").getAttribute("class"));
	$("#guide-title").addClass("int-page");
	console.log("Class List : " + $("#guide-title").getAttribute("class"));
	$("#guide-title").removeClass("make-hidden");
	$("#left-guide-body").addClass("col-md-3");
	$("#left-guide-body").addClass("s-lg-tabs-side");
	$("#left-guide-body").addClass("pad-bottom-med");
	$("#right-guide-body").addClass("col-md-9");
	$("#right-guide-body").removeClass("col-md-12");
  }
  else {
	$("#left-guide-body").addClass("make-hidden");
	$("#guide-title").removeClass("make-hidden");
	$("#page-name").addClass("make-hidden");
	$("#left-guide-body").removeClass("col-md-3");
	$("#left-guide-body").removeClass("s-lg-tabs-side");
	$("#left-guide-body").removeClass("pad-bottom-med");
	$("#right-guide-body").addClass("col-md-12");
	$("#right-guide-body").removeClass("col-md-9");
  }
}