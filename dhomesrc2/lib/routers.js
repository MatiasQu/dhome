Projects = new Meteor.Collection('projects');
Contractors = new Meteor.Collection('contractors');
var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
  stores: [imageStore]
});
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
Router.route('/contractors/create');
Router.route('/owners');
Router.route('/projects');
Router.route('/faq');
Router.route('/projects/:_id', function () {
	this.render('project'), {
		data: function () {return Projects.findOne(this.params._id);}
		 };
	})
Router.route('/contractors/edit/:_id',{
	name:'contractorsEdit',
	data:function() {return Contractors.findOne(this.params._id);}
});

