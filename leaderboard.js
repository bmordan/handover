Pupils = new Meteor.Collection("pupils");
Dialysis = new Meteor.Collection("dialysis");

if (Meteor.isClient) {
  
  Session.set("page", "spread");
  Date.prototype.yyyymmdd = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); 
    };
  var d = new Date();
  
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
      console.log(e);
      var name = e.delegateTarget.children['name'].value;
      var age = e.delegateTarget.children['age'].value;
      var bed = e.delegateTarget.children['bed'].value;
      var list = $('input[name=list]:checked')[0].value;
      var ward = $('input[name=ward]:checked')[0].value;
      Pupils.insert({date: d.yyyymmdd(), name: name, age: age, bed: bed, list: list, ward: ward});
      e.delegateTarget.children['name'].value = null;
      e.delegateTarget.children['age'].value = null;
      e.delegateTarget.children['bed'].value = null;
      $('input[name=list]').attr('checked',false);
      $('input[name=ward  ]').attr('checked',false);      
    }
  });
  
  Template.early.list = function(){
    return Pupils.find({list: 'E'});
  };
  
  Template.primary.list = function(){
    return Pupils.find({list: 'P'});
  };
  
  Template.secondary.list = function(){
    return Pupils.find({list: 'S'});
  };
  
  Template.ward.list = function(){
    return Pupils.find({list: 'W'});
  };

  Template.dialysis.list = function(){
    return Dialysis.find({});
  };

}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    
    return Meteor.methods({
      removeAllPupils: function(){
        return Pupils.remove({});
        return Dialysis.remove({});
      }
    });

    if(Dialysis.find().count() === 0){
      Dialysis.insert({name:"Ben",age:15,days:1});
      Dialysis.insert({name:"Simone",age:9,days:1});
    }

  });
}
