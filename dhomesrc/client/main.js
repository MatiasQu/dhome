//Helpers go here

if (Meteor.isClient){

Template.projects.helpers({
  projectList: function () {
    return Projects.find();
  }
});
}
