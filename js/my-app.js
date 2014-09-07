// Initialize your app
var myApp = new Framework7({
  init: false //Disable App's automatica initialization
});



// Export selectors engine
var $$ = Dom7;


//Now we add our callback for initial page
myApp.onPageInit('index', function (page) {
  //Do something here with home page


var serviceURL = "http://smilesavers.net.au/";

var employees;

getEmployeeList();

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
			$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
					'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
					'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
					'<p class="line2">' + employee.title + '</p>' +
					'<span class="bubble">' + employee.reportCount + '</span></a></li>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}



});
 
//And now we initialize app
myApp.init();

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});




// Callbacks to run specific code for specific pages, for example for About page:

myApp.onPageInit('about', function (page) {

	$$('.create-page').on('click', function () {
        createContentPage();
    });
});



// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}