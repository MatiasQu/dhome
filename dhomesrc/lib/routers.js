Projects = new Meteor.Collection('projects');

Router.configure({
	layoutTemplate: 'defaultLayout'
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

