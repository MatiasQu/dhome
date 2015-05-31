//Helpers go here

if (Meteor.isClient){

Template.projects.helpers({
  projectList: function () {return Projects.find();}
});

//Convert data in projectForm into template variables

Template.projectForm.events({   //Will be used when new project gets created 
	'click .save': function(event, template) {
		var vdescription = template.find('.description').value; //** Match-
		var vlocation = template.find('.location').value;
		var vdate = new Date();
		var vendDate = template.find('.endDate').value;
		// var vtimeLeft = 
		var vbudget = template.find('.budget').value;
		var vbidToClose = template.find('.bidToClose').value;
		alert(vdescription + vdate);
		addProject(vdescription, vlocation, vdate, vendDate, vbudget, vbidToClose); //cur lowest bid & post ends need to be implemented
	}
});
var addProject = function(des, loc, dat, end, bud, bid2close) {
	Projects.insert({
		description: des,
		location: loc,
		date: dat,
		// endDate: ....
		//timeLeft: ...
		budget: bud,
		bidToClose: bid2close

	});
};

}
