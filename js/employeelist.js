var serviceURL = "http://smilesavers.net.au/";

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var employees;

$(window).load(function() {
	setTimeout(getEmployeeList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getEmployeeList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getemployees.php', function(data) {
		$('#busy').hide();
		$('#employeeList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li class="item-content"><a href="employeedetails.html?id=' + employee.id + '">' +
					'<div class="item-media"><img src="pics/' + employee.picture + '" class="list-icon"/></div>' +
					'<div class="item-inner"><div class="item-title"><p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p></div>' +
					'<div class="item-after"><p class="line2">' + employee.title + '</p></div>' +
					'</a></li></div>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}