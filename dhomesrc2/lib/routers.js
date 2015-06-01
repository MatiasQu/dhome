Projects = new Meteor.Collection('projects');

/*Template.registerHelper('formatDate', function(date) {
  return 1; // moment(date).format('MM-DD-YYYY');
});
*/
Meteor.startup(function() {
Meteor.methods({
	removeAllProjects: function(){
		Projects.remove({});
	}
})
});



Router.configure({
	layoutTemplate: 'defaultLayout',
	notFoundTemplate: 'inConstruction'
});

Router.route('/', 'homepage');
Router.route('/about');
Router.route('/contractors');
Router.route('/owners');
Router.route('/projects');
Router.route('/faq');
Router.route('/projects/:_id', function () {
	this.render('project'), {
		data: function () {return Projects.findOne(this.params._id);}
		 };
	})

