//Helpers go here

if (Meteor.isClient){
Session.setDefault('editing_project', false);  // Should be null? Seems to work just fine
Session.images = ""

Template.contractors.helpers({
	contractorList: function() {return Contractors.find();}
});

Template.projects.helpers({
  projectList: function () {return Projects.find();}
});

Template.imageView.helpers({
  images: function () {
    return Session.images; // Where Images is an FS.Collection instance
  }
});

/*Template.projects.events({
	'click .addProjectBtn': function(event, template) {
}
})*/

Template.projects.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
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
		addProject(vdescription, vlocation, vdate, vendDate, vbudget, vbidToClose); //cur lowest bid & post ends need to be implemented
	}
});


Template.biddingModal.events({
	'click .placeABid': function(event, template){
		Session.set('myid', template.data._id);
		},
	'click .confirm': function(event, template) {
		var vbidAmount = template.find('.bidAmount').value;
		Projects.update({_id: Session.get('myid')}, {$set: {bidAmount: "$" + vbidAmount}});   // Add filed***************** $set *******************
	}
})

var addProject = function(des, loc, dat, end, bud, bid2close) {
	Projects.insert({
		description: des,
		location: loc,
		date: dat,
		endDate: end,
		//timeLeft: ...
		budget: "$" + bud,
		bidToClose: "$" + bid2close
	});
};

Template.contractorsCreate.events({
	'click .submitPage': function(event, template) {	//Used when a new contractor page is submitted
		var pname = template.find('.nameInput').value;
		var pdescription = template.find('.descInput').value;
		createpage(pname,pdescription);
		Router.go('contractors');
	},
	'change .imageInput': function(event, template) {	//to show current uploaded images
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			Images.insert(files[i], function (err, fileObj) {
				Session.images = imagesURL;
			});
		
		}
	},
});

var createpage = function(pname,pdescription) {
	Contractors.insert({
		name: pname,
		description: pdescription,
	});
};

Template.contractorsEdit.events({		//Used when a contractor page is edited
	'click .saveChanges': function(event, template) {
		var pname = template.find('.nameInput').value;
		var pdescription = template.find('.descInput').value;
		Contractors.update(	{_id: this._id},{
			name: pname,
			description: pdescription,
			});
		Router.go('contractors');
	}
});

}
