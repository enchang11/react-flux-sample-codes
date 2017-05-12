var cabName = 1;
$(document).ready(function(e) {
	$(".list").css("height", $(window).height()-62+"px");
    $("#searchBtn").on('click', function(){
		$('.search input').toggleClass("active");
	});
	$(".cabinet_container").css("width", $(window).width()-300+"px").css("height", $(window).height()-62+"px");
	$(window).on('resize', function(){
		$(".list").css("height", $(window).height()-62+"px");
		$(".cabinet_container").css("width", $(window).width()-300+"px").css("height", $(window).height()-62+"px");
	});
	
	$(".addLevel").on('click', function(){
			$(this).siblings().append("<li></li>");
	});
	$("#addCab").on('click', function(){
		$(".cabinet_container").append('<div class="cab">'
											+'<button class="deleteCab">Delete</button>'
      										+'<button class="addLevel">Add Level</button>'
											+'<h3>Cabinet '+ cabName+'</h3>'
      										+'<ul>'
        									+'<li><ul></ul></li>'
											+'<li><ul></ul></li>'
											+'<li><ul></ul></li>'
											+'</ul>'
										+'</div>');
		cabName++;
	});
	$(".cabinet_container").on('click', '.cab > ul > li', function(){
		$(this).toggleClass("active");
	});
	
	
	$(".cabinet_container").on('click', '.deleteCab', function(){
			$(this).parent().remove();
			cabName--;
	});
	$(".cabinet_container").on('click', '.addLevel', function(){
			$(this).siblings("ul").append("<li><ul></ul></li>");
	});
	
	
	$(".cabinet_container").on('dragover', '.cab > ul > li',function(e){
		e.preventDefault();
	});
	$("#del").on('dragover',function(e){
		e.preventDefault();
	});
	$("#doc1,#doc2,#doc3,#doc4,#doc5").on("dragstart",function(e){
		e.originalEvent.dataTransfer.setData("Text",e.target.id);
	});
	$(".cabinet_container").on('drop', '.cab > ul > li',function(e){
		e.preventDefault();
		var data=e.originalEvent.dataTransfer.getData("Text");
		$(this).find("ul").append(document.getElementById(data));
		$(this).addClass("active");
	});
	
	$("#del").on('drop',function(e){
		e.preventDefault();
		var data=e.originalEvent.dataTransfer.getData("Text");
		document.getElementById(data).remove();
	});
	$("#history").on('click', function(){
		$(".history_modal").fadeIn(100);
		showOverlay();
	});
	$(".history_modal").on('click', '.close',function(){
		$(".history_modal").fadeOut(100);
		hideOverlay();
	});
	$("#reg").on('click', function(){
		$(".reg_modal").fadeIn(100);
		showOverlay();
	});
	$(".reg_modal").on('click', '.close',function(){
		$(".reg_modal").fadeOut(100);
		hideOverlay();
	});
	
	$("#searchInput").on('keypress', function(e){
		if (e.which == 13) {
			$(".search_modal").fadeIn(100);
			showOverlay();
			return false; 
		}
	});
	$(".search_modal").on('click', '.close',function(){
		$(".search_modal").fadeOut(100);
		hideOverlay();
	});
	$(".addDoc").on('click',function(){
		$(".file_modal").fadeIn(100);
		showOverlay();
	});
	$(".file_modal").on('click', '.close',function(){
		$(".file_modal").fadeOut(100);
		hideOverlay();
	});
});
var overlay = '<div id="overlay" class="overlay"></div>'

function showOverlay(){
	$("body").append(overlay);
};
function hideOverlay(){
	$("#overlay").remove();
};

