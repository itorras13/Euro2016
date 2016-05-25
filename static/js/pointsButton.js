$(document).ready(function(){
	var empty = "";
	// var inputs = ["f1h", "f1a", "f2h", "f2a", "f3h", "f3a", "f4h", "f4a", "f5h", "f5a", "f6h", "f6a"]
	// var inputs = ["a1h", "a1a", "a2h", "a2a", "a3h", "a3a", "a4h", "a4a", "a5h", "a5a", "a6h", "a6a", "b1h", "b1a", "b2h", "b2a", "b3h", "b3a", "b4h", "b4a", "b5h", "b5a", "b6h", "b6a", "c1h", "c1a", "c2h", "c2a", "c3h", "c3a", "c4h", "c4a", "c5h", "c5a", "c6h", "c6a", "d1h", "d1a", "d2h", "d2a", "d3h", "d3a", "d4h", "d4a", "d5h", "d5a", "d6h", "d6a", "e1h", "e1a", "e2h", "e2a", "e3h", "e3a", "e4h", "e4a", "e5h", "e5a", "e6h", "e6a", "f1h", "f1a", "f2h", "f2a", "f3h", "f3a", "f4h", "f4a", "f5h", "f5a", "f6h", "f6a"]
	// var input_scores = {}
	$('#pointsButton').on('click', function () {
		var input_scores = {}
		var inputs = ["a1h", "a1a", "a2h", "a2a", "a3h", "a3a", "a4h", "a4a", "a5h", "a5a", "a6h", "a6a", "b1h", "b1a", "b2h", "b2a", "b3h", "b3a", "b4h", "b4a", "b5h", "b5a", "b6h", "b6a", "c1h", "c1a", "c2h", "c2a", "c3h", "c3a", "c4h", "c4a", "c5h", "c5a", "c6h", "c6a", "d1h", "d1a", "d2h", "d2a", "d3h", "d3a", "d4h", "d4a", "d5h", "d5a", "d6h", "d6a", "e1h", "e1a", "e2h", "e2a", "e3h", "e3a", "e4h", "e4a", "e5h", "e5a", "e6h", "e6a", "f1h", "f1a", "f2h", "f2a", "f3h", "f3a", "f4h", "f4a", "f5h", "f5a", "f6h", "f6a"]
		complete = true;
		var groupA = {France: 0, Romania: 0, Albania: 0, Switzerland: 0}
		var groupB = {England: 0, Russia: 0, Wales: 0, Slovakia: 0}
		var groupC = {Germany: 0, Ukraine: 0, Poland: 0, 'Northern Ireland': 0}
		var groupD = {Spain: 0, 'Czech Republic': 0, Turkey: 0, Croatia: 0}
		var groupE = {Belgium: 0, Italy: 0, 'Republic of Ireland': 0, Sweden: 0}
		var groupF = {Portugal: 0, Iceland: 0, Austria: 0, Hungary: 0}
		var groups = {a: groupA, b: groupB, c: groupC, d: groupD, e: groupE, f: groupF}
		var team_games = {}
		var standings = {a: {}, b: {}, c: {}, d: {}, e: {}, f: {}}
		var goals_per_team = {France: {goals_for: 0, goals_against: 0}, Romania: {goals_for: 0, goals_against: 0}, Albania: {goals_for: 0, goals_against: 0}, Switzerland: {goals_for: 0, goals_against: 0}, 
			England: {goals_for: 0, goals_against: 0}, Russia: {goals_for: 0, goals_against: 0}, Wales: {goals_for: 0, goals_against: 0}, Slovakia: {goals_for: 0, goals_against: 0}, 
			Germany: {goals_for: 0, goals_against: 0}, Ukraine: {goals_for: 0, goals_against: 0}, Poland: {goals_for: 0, goals_against: 0}, 'Northern Ireland': {goals_for: 0, goals_against: 0}, 
			Spain: {goals_for: 0, goals_against: 0}, 'Czech Republic': {goals_for: 0, goals_against: 0}, Turkey: {goals_for: 0, goals_against: 0}, Croatia: {goals_for: 0, goals_against: 0},
			Belgium: {goals_for: 0, goals_against: 0}, Italy: {goals_for: 0, goals_against: 0}, 'Republic of Ireland': {goals_for: 0, goals_against: 0}, Sweden: {goals_for: 0, goals_against: 0},
			Portugal: {goals_for: 0, goals_against: 0}, Iceland: {goals_for: 0, goals_against: 0}, Austria: {goals_for: 0, goals_against: 0}, Hungary: {goals_for: 0, goals_against: 0}}
		var $btn = $(this).button('loading');
		for (var i = 0; i < inputs.length; ++i) {
			current = 'input[name="' + inputs[i] + '"]';
			current_value = $(current).val();
			input_scores[inputs[i]] = parseInt(current_value)
			if (current_value == empty || current_value > 9 || current_value < 0) {
				string_array = inputs[i].split("");
				game = string_array[0] + string_array[1]
				game = game.toUpperCase()
				if (string_array[2]=="h"){
					home_or_away = "home"
				} else {
					home_or_away = "away"
				}
				// alert("Game " + game + " " + home_or_away + " is not filled in yet");
				complete = false;
				break;
			}
		}
		if (complete) {
			for (var i = 0; i < inputs.length; ++i) {
				group = inputs[i][0];
				home = inputs[i];
				away = inputs[i+1];
				home_team = $('label[for="' + home + '"]').text();
				if (team_games[home_team] == undefined) {
					team_games[home_team] = {}
				}
				away_team = $('label[for="' + away + '"]').text();
				team_games[home_team][away_team] = inputs[i]
				home_score = input_scores[inputs[i]];
				away_score = input_scores[inputs[i+1]];
				goals_per_team[home_team].goals_for += home_score;
				goals_per_team[away_team].goals_for += away_score;
				goals_per_team[home_team].goals_against += away_score;
				goals_per_team[away_team].goals_against += home_score;
				if (home_score > away_score) {
					groups[group][home_team] += 3;
				} else if (home_score < away_score) {
					groups[group][away_team] += 3;
				} else {
					groups[group][home_team] += 1;
					groups[group][away_team] += 1;
				}
				++i;
			}
			group_letters = ["a","b","c","d","e","f"];
			for (var i = 0; i < group_letters.length; ++i) {
				curr = group_letters[i];
				teamsSorted = Object.keys(groups[curr]).sort(function(a,b){return groups[curr][a]-groups[curr][b]})
				if (groups[curr][teamsSorted[3]] > groups[curr][teamsSorted[2]]){
					standings[curr].first_place = teamsSorted[3]
					if (groups[curr][teamsSorted[2]] > groups[curr][teamsSorted[1]]) {
						standings[curr].second_place = teamsSorted[2];
						if (groups[curr][teamsSorted[1]] > groups[curr][teamsSorted[0]]) {
							standings[curr].third_place = teamsSorted[1];
						} else if (groups[curr][teamsSorted[1]] == groups[curr][teamsSorted[0]]) {
							standings[curr].third_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[1], teamsSorted[0]);
						}
					} else if (groups[curr][teamsSorted[2]] == groups[curr][teamsSorted[0]]) {
						second_place = three_way_tie(goals_per_team, teamsSorted[2], teamsSorted[1], teamsSorted[0]);
						standings[curr].second_place = second_place;
						if (second_place == teamsSorted[2]) {
							standings[curr].third_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[1], teamsSorted[0]);
						} else if (second_place == teamsSorted[1]) {
							standings[curr].third_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[2], teamsSorted[0]);
						} else {
							standings[curr].third_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[2], teamsSorted[1]);;
						}
					} else if (groups[curr][teamsSorted[2]] == groups[curr][teamsSorted[1]]) {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[2], teamsSorted[1]);
						standings[curr].second_place = second_place;
						if (second_place == teamsSorted[2]) {
							standings[curr].third_place = teamsSorted[1];
						} else {
							standings[curr].third_place = teamsSorted[2];
						}
					}
				} else if (groups[curr][teamsSorted[3]] == groups[curr][teamsSorted[1]]) {
					first_place = three_way_tie(goals_per_team, teamsSorted[3], teamsSorted[2], teamsSorted[1]);
					standings[curr].first_place = first_place;
					if (first_place == teamsSorted[3]) {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[2], teamsSorted[1]);
					} else if (first_place == teamsSorted[2]) {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[3], teamsSorted[1]);
					} else {
						second_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[3], teamsSorted[2]);;
					}
					standings[curr].second_place = second_place;
					if (teamsSorted[3] != second_place && teamsSorted[3] != first_place) {
						standings[curr].third_place = teamsSorted[3];
					} else if (teamsSorted[2] != second_place && teamsSorted[2] != first_place) {
						standings[curr].third_place = teamsSorted[2];
					} else {
						standings[curr].third_place = teamsSorted[1];
					}
				} else if (groups[curr][teamsSorted[3]] == groups[curr][teamsSorted[2]]) {
					first_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[3], teamsSorted[2]);
					standings[curr].first_place = first_place;
					if (first_place == teamsSorted[3]) {
						standings[curr].second_place = teamsSorted[2];
					} else {
						standings[curr].second_place = teamsSorted[3];
					}
					if (groups[curr][teamsSorted[1]] > groups[curr][teamsSorted[0]]) {
						standings[curr].third_place = teamsSorted[1];
					} else if (groups[curr][teamsSorted[1]] == groups[curr][teamsSorted[0]]) {
						standings[curr].third_place = two_way_tie(team_games, goals_per_team, input_scores, teamsSorted[1], teamsSorted[0]);
					}
				}
			}
			var third_place_teams = {}
			for (var i = 0; i < group_letters.length; ++i) {
				curr = group_letters[i];
				first = standings[curr].first_place;
				second = standings[curr].second_place;
				$('#' + curr + '1').find('option').remove().end()
				$('#' + curr + '2').find('option').remove().end()
				$('#' + curr + '1').append($("<option></option>").attr("value",first).text(first));
				$('#' + curr + '2').append($("<option></option>").attr("value",second).text(second));
				points = groups[curr][standings[curr].third_place]
				third = standings[curr].third_place;
				third_place_teams[third] = {}
				third_place_teams[third].points = points;
				third_place_teams[third].group = curr;
				goals_for = goals_per_team[third].goals_for
				third_place_teams[third].goals_for = goals_for;
				third_place_teams[third].goal_diff = goals_for - goals_per_team[third].goals_against;
			}
			top4 = getTopFour(third_place_teams, goals_per_team);
			selectThirdPlacePositions(top4);
			$('#bracketCollapse').collapse("show")
			updateQuarterFinals();
		} else {
			// "Game " + game + " " + home_or_away + " is not filled in yet"
			$('#bracketCollapse').collapse("hide")
			$('#modalHead').html('<i class="glyphicon glyphicon-thumbs-down"></i>  Not all the scores have been entered!')
			$('#modalParagraph').html("<b>Game " + game + " " + home_or_away + " is not filled in yet or is not between 0 and 9!<b>")
			$('#notFinishedModal').modal('show');
		}
		$btn.button('reset');
	})
});

function updateQuarterFinals() {
    $('.quarter_select')
        .find('option')
        .remove()
        .end()
        .append('<option disabled selected value style="display: none">Choose a Team</option>')
    ;
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
    $('#q1').append($("<option></option>").attr("value",a2).text(a2));
    $('#q1').append($("<option></option>").attr("value",c2).text(c2));
    $('#q2').append($("<option></option>").attr("value",d1).text(d1));
    $('#q2').append($("<option></option>").attr("value",third1).text(third1));
    $('#q3').append($("<option></option>").attr("value",b1).text(b1));
    $('#q3').append($("<option></option>").attr("value",third2).text(third2));
    $('#q4').append($("<option></option>").attr("value",f1).text(f1));
    $('#q4').append($("<option></option>").attr("value",e2).text(e2));
    $('#q5').append($("<option></option>").attr("value",c1).text(c1));
    $('#q5').append($("<option></option>").attr("value",third3).text(third3));
    $('#q6').append($("<option></option>").attr("value",e1).text(e1));
    $('#q6').append($("<option></option>").attr("value",d2).text(d2));
    $('#q7').append($("<option></option>").attr("value",a1).text(a1));
    $('#q7').append($("<option></option>").attr("value",third4).text(third4));
    $('#q8').append($("<option></option>").attr("value",b2).text(b2));
    $('#q8').append($("<option></option>").attr("value",f2).text(f2)); 
}

function selectThirdPlacePositions(top4) {
	$('#third1').find('option').remove().end();
	$('#third2').find('option').remove().end();
	$('#third3').find('option').remove().end();
	$('#third4').find('option').remove().end();
	groups = []
	group_to_team = {}
	for (var key in top4){
		groups.push(top4[key].group);
		group_to_team[top4[key].group] = key;
	}
	groups.sort();
	groups = groups.join("");
	if (groups == "abcd") {
		$('#third1').append($("<option></option>").attr("value",group_to_team["b"]).text(group_to_team["b"]));
	} else if (groups[3]=="e" || groups=="acef" || groups=="adef" || groups=="cdef") {
		$('#third1').append($("<option></option>").attr("value",group_to_team["e"]).text(group_to_team["e"]));
	} else {
		$('#third1').append($("<option></option>").attr("value",group_to_team["f"]).text(group_to_team["f"]));
	}

	if (groups == "bcef") {
		$('#third2').append($("<option></option>").attr("value",group_to_team["c"]).text(group_to_team["c"]));
	} else if ((groups[0]=="a" && groups[1]=="b" && groups[3]!="d") || groups=="acef" || groups=="adef" ){
		$('#third2').append($("<option></option>").attr("value",group_to_team["a"]).text(group_to_team["a"]));
	} else {
		$('#third2').append($("<option></option>").attr("value",group_to_team["d"]).text(group_to_team["d"]));
	}

	if (groups == "acef" || groups == "adef" || groups == "cdef") {
		$('#third3').append($("<option></option>").attr("value",group_to_team["f"]).text(group_to_team["f"]));
	} else if (groups == "abcd" || groups == "acde" || groups == "acdf") {
		$('#third3').append($("<option></option>").attr("value",group_to_team["a"]).text(group_to_team["a"]));
	} else {
		$('#third3').append($("<option></option>").attr("value",group_to_team["b"]).text(group_to_team["b"]));
	}

	if (groups == "abef" || groups == "bcef" || groups == "bdef") {
		$('#third4').append($("<option></option>").attr("value",group_to_team["e"]).text(group_to_team["e"]));
	} else if (groups == "abde" || groups == "abdf" || groups == "adef") {
		$('#third4').append($("<option></option>").attr("value",group_to_team["d"]).text(group_to_team["d"]));
	} else {
		$('#third4').append($("<option></option>").attr("value",group_to_team["c"]).text(group_to_team["c"]));
	}

}

function getTopFour(teams, goals_per_team) {
	teamsSorted = Object.keys(teams).sort(function(a,b){return teams[a].points-teams[b].points});
	top4 = {}
	for (var i = teamsSorted.length - 1; i >= 0; i--) {
		current_team = teamsSorted[i];
		if (Object.keys(top4).length < 4) {
			top4[current_team] = teams[current_team];
		} else {
			for (var key in top4) {
				if (teams[current_team].points > top4[key].points) {
					delete top4[key];
					top4[current_team] = teams[current_team];
					current_team = key;
				} else if (teams[current_team].points == top4[key].points) {
					if (teams[current_team].goal_diff > top4[key].goal_diff) {
						delete top4[key];
						top4[current_team] = teams[current_team];
						current_team = key;
					} else if (teams[current_team].goal_diff == top4[key].goal_diff) {
						if (teams[current_team].goals_for > top4[key].goals_for) {
							delete top4[key];
							top4[current_team] = teams[current_team];
							current_team = key;
						}
					}
				}
			}
		}
	}
	return top4;
}

function three_way_tie(goals_per_team, team1, team2, team3) {
	team1_goal_for = goals_per_team[team1].goals_for;
	team2_goal_for = goals_per_team[team2].goals_for;
	team3_goal_for = goals_per_team[team3].goals_for;
	team1_goal_diff = team1_goal_for - goals_per_team[team1].goals_against;
	team2_goal_diff = team2_goal_for - goals_per_team[team2].goals_against;
	team3_goal_diff = team3_goal_for - goals_per_team[team3].goals_against;
	if (team1_goal_diff > team3_goal_diff && team1_goal_diff > team2_goal_diff) {
		return team1;
	} else if (team2_goal_diff > team1_goal_diff && team2_goal_diff > team3_goal_diff) {
		return team2; 
	} else if (team3_goal_diff > team1_goal_diff && team3_goal_diff > team2_goal_diff) {
		return team3; 
	}
	if (team1_goal_for > team3_goal_for && team1_goal_for > team2_goal_for) {
		return team1;
	} else if (team2_goal_for > team1_goal_for && team2_goal_for > team3_goal_for) {
		return team2; 
	} else if (team3_goal_for > team1_goal_for && team3_goal_for > team2_goal_for) {
		return team3; 
	}
	if (team1_goal_diff > team3_goal_diff || team1_goal_diff > team2_goal_diff) {
		return team1;
	} else if (team2_goal_diff > team1_goal_diff || team2_goal_diff > team3_goal_diff) {
		return team2; 
	} else if (team3_goal_diff > team1_goal_diff || team3_goal_diff > team2_goal_diff) {
		return team3; 
	}
	if (team1_goal_for > team3_goal_for || team1_goal_for > team2_goal_for) {
		return team1;
	} else if (team2_goal_for > team1_goal_for || team2_goal_for > team3_goal_for) {
		return team2; 
	} else if (team3_goal_for > team1_goal_for|| team3_goal_for > team2_goal_for) {
		return team3; 
	}
	return team1;
}

function two_way_tie(team_games, goals_per_team, input_scores, team1, team2) {
	if (team_games[team1][team2] != undefined){
		game_code_home = team_games[team1][team2];
		team1_score = input_scores[game_code_home];
		game_code_away = game_code_home.slice(0,2) + "a";
		team2_score = input_scores[game_code_away];
	} else {
		game_code_home = team_games[team2][team1];
		team2_score = input_scores[game_code_home];
		game_code_away = game_code_home.slice(0,2) + "a";
		team1_score = input_scores[game_code_away];
	}
	if (team2_score > team1_score) {
		return team2;
	} else if (team1_score > team2_score) {
		return team1;
	}
	team1_goal_diff = goals_per_team[team1].goals_for - goals_per_team[team1].goals_against;
	team2_goal_diff = goals_per_team[team2].goals_for - goals_per_team[team2].goals_against;
	if (team2_goal_diff > team1_goal_diff) {
		return team2;
	} else if (team1_goal_diff > team2_goal_diff) {
		return team1;
	}
	if (goals_per_team[team2].goals_for > goals_per_team[team1].goals_for) {
		return team2;
	} else if (goals_per_team[team1].goals_for > goals_per_team[team2].goals_for) {
		return team1;
	}
	// this point just guess
	return team1;
}




