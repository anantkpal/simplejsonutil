var jsonObj;
function validateNTree(){
	$('#jsonstring').prev().text('');
	var jsonString = $('#jsonstring').val();
	var msg='';
	try{
			jsonObj=JSON.parse(jsonString);
			$('#jsonstring').parent().addClass('has-success').removeClass('has-error');
			msg="Valid JSON"
			$('#jsonpath').show();
			$('#validateXMLBtn').removeAttr('disabled');
	}catch(e){
		msg = '<b>Validation failed with error :</b>'+e.toString().substring(e.toString().indexOf('JSON.parse:')+11);	
		var position = e.toString().substring(e.toString().indexOf('column ')+7);
		position =position.substring(0,position.indexOf(' ')+1);
		moveCursor($('#jsonstring')[0],(position-1));
		$('#jsonstring').parent().addClass('has-error').removeClass('has-success');
		$('#jsonpath').hide();
		$('#jsonpath').find('input').val('');
		$('#jsonpath').find('p').text('');
		$('#validateXMLBtn').attr('disabled','disabled');
	}
	$('#jsonstring').prev().html(msg);
}


function moveCursor(inputEl, pos) { 
   if (inputEl.setSelectionRange) { 
     inputEl.focus(); 
     inputEl.setSelectionRange(pos, pos); 
   } else if (inputEl.createTextRange) { 
     var range = inputEl.createTextRange(); 
     range.collapse(true); 
     range.moveEnd('character', pos); 
     range.moveStart('character', pos); 
     range.select(); 
   } 
}
function getjsonpathvalue(){
var value=''
var path =$('#jsonpathtext').val();

try{
value =(eval('window.jsonObj.'+path));
if(typeof value ==='object'){
	value = JSON.stringify(value);
}
}catch(e){
}
$('#jsonpathtextstring').text('Value for path \''+path+'\'  : '+value);
}




$(document).ready(function(){

var currentDocumentLocation=window.location.href;
currentDocumentLocation=currentDocumentLocation.substring(currentDocumentLocation.indexOf('://')+3)
if(currentDocumentLocation.indexOf('simplejsonutil')!==0)
	window.location.href='http://simplejsonutil.anantkpal.in/'

$('#validateTreeBtn').on('click',validateNTree);
$('#getjsonval').on('click',getjsonpathvalue);
$('#jsonstring').change(function(){
	$('#jsonpath').hide();
	$('#jsonpath').find('input').val('');
		$('#jsonpath').find('p').text('');
});
});
