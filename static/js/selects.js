$(document).ready(function(){
    var quarterFinalists = [];
    var semiFinalists = [];
    var finalists = [];
    var champs = [];
    var index = 0;
  $('[data-toggle="tooltip"]').tooltip();
  $('.quarter_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    index = semiFinalists.indexOf(prevValue);
    if (index > -1) {
        semiFinalists.splice(index, 1);
    }
    $('.quarter_select').not(this).find('option[value="'+prevValue+'"]').show();
    var value = $(this).val();
    semiFinalists.push(value);
    semiFinalists.sort();
    $(this).data('previous',value);
    $('.quarter_select').not(this).find('option[value="'+value+'"]').hide();
    $('.semi_select')
        .find('option')
        .remove()
        .end()
        .append('<option disabled selected value style="display: none"></option>')
    ;
    for (var i = 0; i < semiFinalists.length; ++i) {
        $('.semi_select').append($("<option></option>")
                    .attr("value",semiFinalists[i])
                    .text(semiFinalists[i])); 
    }
    var q1 = $("#q1").children("option").filter(":selected").text();
    var q2 = $("#q2").children("option").filter(":selected").text();
    var q3 = $("#q3").children("option").filter(":selected").text();
    var q4 = $("#q4").children("option").filter(":selected").text();
    var q5 = $("#q5").children("option").filter(":selected").text();
    var q6 = $("#q6").children("option").filter(":selected").text();
    var q7 = $("#q7").children("option").filter(":selected").text();
    var q8 = $("#q8").children("option").filter(":selected").text();
    $(".s1").attr('data-original-title', q1 + " v " + q2 ).tooltip('setContent');
    $(".s2").attr('data-original-title', q3 + " v " + q4 ).tooltip('setContent');
    $(".s3").attr('data-original-title', q5 + " v " + q6 ).tooltip('setContent');
    $(".s4").attr('data-original-title', q7 + " v " + q8 ).tooltip('setContent');
  });
  $('.semi_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    index = finalists.indexOf(prevValue);
    if (index > -1) {
        finalists.splice(index, 1);
    }
    $('.semi_select').not(this).find('option[value="'+prevValue+'"]').show();
    var value = $(this).val();
    finalists.push(value);
    finalists.sort();
    $(this).data('previous',value);
    $('.semi_select').not(this).find('option[value="'+value+'"]').hide();
    $('.fin_select')
        .find('option')
        .remove()
        .end()
        .append('<option disabled selected value style="display: none"></option>')
    ;
    for (var i = 0; i < finalists.length; ++i) {
        $('.fin_select').append($("<option></option>")
                    .attr("value",finalists[i])
                    .text(finalists[i])); 
    }
    var s1 = $("#s1").children("option").filter(":selected").text();
    var s2 = $("#s2").children("option").filter(":selected").text();
    var s3 = $("#s3").children("option").filter(":selected").text();
    var s4 = $("#s4").children("option").filter(":selected").text();
    $(".fin1").attr('data-original-title', s1 + " v " + s2 ).tooltip('setContent');
    $(".fin2").attr('data-original-title', s3 + " v " + s4 ).tooltip('setContent');
  });
  $('.fin_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    index = champs.indexOf(prevValue);
    if (index > -1) {
        champs.splice(index, 1);
    }
    $('.fin_select').not(this).find('option[value="'+prevValue+'"]').show();
    var value = $(this).val();
    champs.push(value);
    champs.sort();
    $(this).data('previous',value);
    $('.fin_select').not(this).find('option[value="'+value+'"]').hide();
    $('.champs_select')
        .find('option')
        .remove()
        .end()
        .append('<option disabled selected value style="display: none"></option>')
    ;
    for (var i = 0; i < champs.length; ++i) {
        $('.champs_select').append($("<option></option>")
                    .attr("value",champs[i])
                    .text(champs[i])); 
    }
    var fin1 = $("#fin1").children("option").filter(":selected").text();
    var fin2 = $("#fin2").children("option").filter(":selected").text();
    $(".champion").attr('data-original-title', fin1 + " v " + fin2 ).tooltip('setContent');
  });
  $('.group_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    index = quarterFinalists.indexOf(prevValue);
    if (index > -1) {
        quarterFinalists.splice(index, 1);
    }
    $('.group_select').not(this).find('option[value="'+prevValue+'"]').show();
    var value = $(this).val();
    quarterFinalists.push(value);
    quarterFinalists.sort();
    $(this).data('previous',value);
    $('.group_select').not(this).find('option[value="'+value+'"]').hide();
    $('.quarter_select')
        .find('option')
        .remove()
        .end()
        .append('<option disabled selected value style="display: none"></option>')
    ;
    for (var i = 0; i < quarterFinalists.length; ++i) {
        $('.quarter_select').append($("<option></option>")
                    .attr("value",quarterFinalists[i])
                    .text(quarterFinalists[i])); 
    }
    var a1 = $("#a1").children("option").filter(":selected").text();
    var a2 = $("#a2").children("option").filter(":selected").text();
    var b1 = $("#b1").children("option").filter(":selected").text();
    var b2 = $("#b2").children("option").filter(":selected").text();
    var c1 = $("#c1").children("option").filter(":selected").text();
    var c2 = $("#c2").children("option").filter(":selected").text();
    var d1 = $("#d1").children("option").filter(":selected").text();
    var d2 = $("#d2").children("option").filter(":selected").text();
    var e1 = $("#e1").children("option").filter(":selected").text();
    var e2 = $("#e2").children("option").filter(":selected").text();
    var f1 = $("#f1").children("option").filter(":selected").text();
    var f2 = $("#f2").children("option").filter(":selected").text();
    var third1 = $("#third1").children("option").filter(":selected").text();
    var third2 = $("#third2").children("option").filter(":selected").text();
    var third3 = $("#third3").children("option").filter(":selected").text();
    var third4 = $("#third4").children("option").filter(":selected").text();    
    $(".q1").attr('data-original-title', a2 + " v " + c2 ).tooltip('setContent');
    $(".q2").attr('data-original-title', d1 + " v " + third1 ).tooltip('setContent');
    $(".q3").attr('data-original-title', b1 + " v " + third2 ).tooltip('setContent');
    $(".q4").attr('data-original-title', f1 + " v " + e2 ).tooltip('setContent');
    $(".q5").attr('data-original-title', c1 + " v " + third3 ).tooltip('setContent');
    $(".q6").attr('data-original-title', e1 + " v " + d2 ).tooltip('setContent');
    $(".q7").attr('data-original-title', a1 + " v " + third4 ).tooltip('setContent');
    $(".q8").attr('data-original-title', b2 + " v " + f2 ).tooltip('setContent');
  });
});