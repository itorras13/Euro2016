$(document).ready(function(){
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (!is_chrome) {
		var form = document.getElementById('formfield'); // form has to have ID: <form id="formID">
		form.noValidate = true;
		form.addEventListener('submit', function(event) { // listen for form submitting
	        if (!event.target.checkValidity()) {
	            event.preventDefault(); // dismiss the default functionality
	            alert('Please, fill the form'); // error message
	        }
	    }, false);
	}
	$('#submitBtn').on('click', function () {
		$('#submitModal').modal('show');
	});
	$('#actualSubmit').click(function(){
    	$('#submitModal').modal('hide');
	});
});