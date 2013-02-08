var dialogs = new Array(); 

function Dialog() { 
  Dialog.prototype.options = { 
		isDraggable:true,
		autohide:true, 
		video:null 
	} 
}

//global vars				
var mouseX; 
var mouseY; 			 
var offsetX = 0; 
var offsetY = 0; 
var dragging = false;
var dragElement; 
var vid; 

/*DOC EVENT LISTENERS********************/
	//mouseX/Y
	$(document).mousemove(function(e){ 
		mouseX = e.pageX; 
		mouseY = e.pageY; 
	}); 
	document.onmouseup = function(e){
		dragging = false; 
	}; 
	//drag
	document.onmousemove = drag;  
	
/*FUNCTIONS***************************/	

function preDrag(){
	offsetX = parseFloat($(this).parent('.dialogContainer').css('left')) - mouseX; 
	offsetY = parseFloat($(this).parent('.dialogContainer').css('top')) - mouseY; 
	dragging = true;
	dragElement = this.parentNode; 
}
function drag(){
	if (dragging == true){
		var container = dragElement;
		container.style.top = (mouseY + offsetY)+"px";
		container.style.left = (mouseX + offsetX)+"px"; 
	}
}
function loadVideo(id){
	if(id){
		vid = id; 
	}
	if(player){ 
		player.loadVideoById(vid); 
	}else{
		setTimeout(loadVideo, 500); 
	}
}

/*CREATE DIALOG************************************/
function createDialog(id,options){
	if(!id)return; //check that there is an id
	var dialog = new Dialog();
	dialog.id = id;	
	
	//vars
	var $dialog = $('#' + id); 	
	
	//set dialog options
	if(options !== null){
		if(options.isDraggable === false){dialog.options.isDraggable = options.isDraggable;} 
		if(options.autohide === false){dialog.options.autohide = options.autohide;}
		if(options.video !== null){dialog.options.video = options.video;}		
	}
	//give classes based on options
 	if(dialog.options.isDraggable === true){
 		//add draggable class  	
 		$dialog.addClass('isDraggable'); 
 		
 		//add Event Listeners for draggable elements
 		var children = $dialog.children(); 
 		for( var i=0; i < children.length; i++){
			if($(children[i]).hasClass('dialogHeader')){
				$(children[i]).on('mousedown',preDrag); 
			}
		}
 		
 		//add autohide class
 		if(dialog.options.autohide === true){
 			$dialog.children().addClass('autohide');
 			$('.vidPlayer').removeClass('autohide');
 		}
 	}
 	//set video
 	if(dialog.options.video !== null){
 		$dialog.children('.vidPlayer').css('display', 'block'); 
 		loadVideo(dialog.options.video); 		
 	}
	else{
 	//set default modal options
 	
 	}	
 	//end
 	dialogs.push(dialog); 
 	return dialog; 	 
}

/*YOUTUBE PLAYER API*************/ 
var player; 
var playerReady; 
function onYouTubeIframeAPIReady(){ 
	player = new YT.Player('yt', { 
		height: '390', 
		width : '640', 
		videoId: '',
		playerVars: {
			"html5" : 1, 
			"enablejsapi" : 1,
		},  
		events: { 
			'onReady' : onPlayerReady, 
			'onStateChange' : onPlayerStateChange, 
		} 
	});
	playerReady = true;  
} 

function onPlayerReady(event){
	//event.target.playVideo(); 
}			

function onPlayerStateChange(event){

}

function stopVideo(){
	player.stopVideo(); 
}
/*******************************/

