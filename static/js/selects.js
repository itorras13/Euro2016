$(document).ready(function(){
    text = "Choose a Team";
    var index = 0;
    var finalists = [];
  $('.quarter_select').on('change', function(event ) {
    var q1 = $("#q1").children("option").filter(":selected").text();
    var q2 = $("#q2").children("option").filter(":selected").text();
    var q3 = $("#q3").children("option").filter(":selected").text();
    var q4 = $("#q4").children("option").filter(":selected").text();
    var q5 = $("#q5").children("option").filter(":selected").text();
    var q6 = $("#q6").children("option").filter(":selected").text();
    var q7 = $("#q7").children("option").filter(":selected").text();
    var q8 = $("#q8").children("option").filter(":selected").text();
    if (q1!=text&&q2!=text&&q3!=text&&q4!=text&&q5!=text&&q6!=text&&q7!=text&&q8!=text) {
        $('.semi_select')
            .find('option')
            .remove()
            .end()
            .append('<option disabled selected value style="display: none">Choose a Team</option>')
        ;
        $('#s1').append($("<option></option>").attr("value",q1).text(q1));
        $('#s1').append($("<option></option>").attr("value",q2).text(q2));
        $('#s2').append($("<option></option>").attr("value",q3).text(q3));
        $('#s2').append($("<option></option>").attr("value",q4).text(q4));
        $('#s3').append($("<option></option>").attr("value",q5).text(q5));
        $('#s3').append($("<option></option>").attr("value",q6).text(q6));
        $('#s4').append($("<option></option>").attr("value",q7).text(q7));
        $('#s4').append($("<option></option>").attr("value",q8).text(q8));
    }
  });
  $('.semi_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    index = finalists.indexOf(prevValue);
    if (index > -1) {
        finalists.splice(index, 1);
    }
    var value = $(this).val();
    finalists.push(value);
    finalists.sort();
    $(this).data('previous',value);
    var s1 = $("#s1").children("option").filter(":selected").text();
    var s2 = $("#s2").children("option").filter(":selected").text();
    var s3 = $("#s3").children("option").filter(":selected").text();
    var s4 = $("#s4").children("option").filter(":selected").text();
    if (s1!=text&&s2!=text&&s3!=text&&s4!=text) {
        $('.fin_select')
            .find('option')
            .remove()
            .end()
            .append('<option disabled selected value style="display: none">Choose a Team</option>')
        ;
        for (var i = 0; i < finalists.length; ++i) {
            $('#third_place').append($("<option></option>")
                        .attr("value",finalists[i])
                        .text(finalists[i])); 
        }
        $('#fin1').append($("<option></option>").attr("value",s1).text(s1));
        $('#fin1').append($("<option></option>").attr("value",s2).text(s2));
        $('#fin2').append($("<option></option>").attr("value",s3).text(s3));
        $('#fin2').append($("<option></option>").attr("value",s4).text(s4));
    }
  });
  $('.fin_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    $('#third_place').not(this).find('option[value="'+prevValue+'"]').show();
    var value = $(this).val();
    $(this).data('previous',value);
    $('#third_place').not(this).find('option[value="'+value+'"]').hide();
    var fin1 = $("#fin1").children("option").filter(":selected").text();
    var fin2 = $("#fin2").children("option").filter(":selected").text();
    if (fin1!=text&&fin2!=text) {  
        $('.champs_select')
            .find('option')
            .remove()
            .end()
            .append('<option disabled selected value style="display: none">Choose a Team</option>')
        ;
        $('#champion').append($("<option></option>").attr("value",fin1).text(fin1));
        $('#champion').append($("<option></option>").attr("value",fin2).text(fin2));
    }
  });
});