//Helpers go here

if (Meteor.isClient){

Template.projects.helpers({
  projectList: function () {
    return Projects.find();
  },
  showProjectDialog: function() {
  	return Session.get('showProjectDialog');
  }
});
}
/*Template.projects.event({
	'click .save'
});

}
*/