$(document).ready(function(){
	$('#submitBtn').on('click', function () {
		$('#submitModal').modal('show');
	});
	$('#actualSubmit').click(function(){
    	$('#submitModal').modal('hide');
	});
});