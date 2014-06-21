Pupils = new Meteor.Collection("pupils");

if (Meteor.isClient) {
  
  Session.set("page", "spread");
  Date.prototype.yyyymmdd = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); 
    };
  d = new Date();
  
  
  Template.switch.events({
    'click' : function (e){
        if(Session.get("page") === "spread"){
          e.delegateTarget.children[1].style.display = 'none';
          e.delegateTarget.children[0].style.display = 'block';
          Session.set("page", "controls");
        }else if(Session.get("page") === "controls"){
          e.delegateTarget.children[0].style.display = 'none';
          e.delegateTarget.children[1].style.display = 'block';
          Session.set("page", "spread");
        }
      }
  });
  
  Template.add.events({
    'click' : function(e){
      var name = e.delegateTarget.children['name'].value;
      var age = e.delegateTarget.children['age'].value;
      var bed = e.delegateTarget.children['bed'].value;
      var list = e.delegateTarget.children['list'].value;
      var ward = e.delegateTarget.children['ward'].value;
      Pupils.insert({date: d.yyyymmdd(), name: name, age: age, bed: bed, list: list, ward: ward});
    }
  });
  
  Template.early.list = function(){
    return Pupils.find({list: 'E'});
  };

}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
