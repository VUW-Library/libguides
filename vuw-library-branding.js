// LibGuides 
// Description:
// This file contains base fundtionality for LibGuides, 
// It will be loaded on each page when viewing a libguide, use this to add javascript support or overrides


var VU = VU || {};
VU.LG = {};

this.toggleMe = {};

// SearchBar
// Description:
// This sets up and binds the events to the search box and opens results in a new window. 
(function ($) {
VU.LG.Base	= 	function(){
    "use strict";
	this.init();
}	
VU.LG.Base.prototype = {
	wordmapCurrent : null,
	
	
	toggleMe :	function(id){
		if(id!=this.wordmapCurrent){
			$('div#'+this.wordmapCurrent).stop().hide(0)	
		}
		var e=$('div#'+id); 
		if($(e).length==0)return true; 
		if($(e).css('display')=="none"){
			this.wordmapCurrent = id; 
			$(e).stop().fadeIn(500); 
		} else { 
			$(e).stop().fadeOut(250); 
		} 
		return false; 		
	},
	
	cleanWordMap	:	function(){
		$('.wordmap area').each(function(index, element) {
			var action = $(this).attr('onClick');
			var index1 = action.indexOf("'");
			var index2 = action.lastIndexOf("'");
			if(index1>0&&index2>0){
				var id = action.substring(index1+1,index2);
				$(this).removeAttr('href');
				$(this).attr('id',id);
				$(this).removeAttr('onClick');
				}
			$(this).bind('mouseover',function(e){
				$(this).css('cursor','pointer');	
			})
        });
		$('.wordmap area').bind('click',{context:this},function(e){
			e.preventDefault();
			var id = $(this).attr('id');
			e.data.context.toggleMe(id);
		});
		
	},
	
	init	:	function(){
		this.cleanWordMap();
	}
}

$(document).ready(function () {
	"use strict";
	$('#s-lg-guide-tabs li.active').parents('li').addClass('active');
	$('ul.list-group.s-lg-boxnav').each(function(index, element) {
       if($(this).children('li').length==1){
			$(this).css('display','none');	
	   }
    });
	(new VU.LG.Base());
})


})(jQuery);