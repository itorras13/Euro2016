$(document).ready(function(){
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (!is_chrome) {
		var form = document.getElementById('formfield'); // form has to have ID: <form id="formID">
		form.noValidate = true;
		form.addEventListener('submit', function(event) { // listen for form submitting
	        if (!event.target.checkValidity()) {
	        	event.preventDefault();
	        	var inputs = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "semi1",
	        		"semi2", "semi3", "semi4", "fin1", "fin2", "champion", "third_place", "top_scorer"]
	            for (var i = 0; i < inputs.length; ++i) {
	            	text = "Your personal information has not been entered"
					current = 'select[name="' + inputs[i] + '"]';
					current_value = $(current).val();
					if (current_value == null) {
						string_array = inputs[i].split("");
						if (string_array[0] == "q"){
							text = "Quarter Finalist " + string_array[1] + " is not chosen!";
						} else if (string_array[0] == "s"){
							text = "Semi Finalist " + string_array[4] + " is not chosen!";
						} else if (string_array[0] == "f"){
							text = "Finalist " + string_array[3] + " is not chosen!";
						} else if (string_array[0] == "c"){
							text = "The champion is not chosen!";
						} else if (inputs[i] == "third_place"){
							text = "Third Place is not chosen!";
						} else if (inputs[i] == "top_scorer"){
							text = "The top scorer is not chosen!";
						}
						break;
					}
				}
				$('#modalHead').html('<i class="glyphicon glyphicon-thumbs-down"></i>  Not all the teams have been chosen!')
				$('#modalParagraph').html("<b>" + text + "</b>")
				$('#notFinishedModal').modal('show');
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