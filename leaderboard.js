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
  function dayStr(i){
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[i];
  };
  function monStr(i){
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[i];
  };
  function swap(e){
	  if(e.target.outerHTML.match(/_down.jpg/gi) == '_down.jpg'){
	      e.target.outerHTML = '<img src="images/PICU_up.jpg" />';
		}else{
		  e.target.outerHTML = '<img src="images/PICU_down.jpg" />';
		}
  }
   
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
  
  Template.early.list = function(){
    return Pupils.find({list: 'E',date: d.yyyymmdd()});
  };
  
  Template.primary.list = function(){
    return Pupils.find({list: 'P',date: d.yyyymmdd()});
  };
  
  Template.secondary.list = function(){
    return Pupils.find({list: 'S',date: d.yyyymmdd()});
  };
  
  Template.ward.list = function(){
    return Pupils.find({list: 'W',date: d.yyyymmdd()});
  };

  Template.dialysis.dlist = function(){
    return Dialysis.find({days: {$in: [d.getDay()]}});
  };

  Template.today.nicedate = function(){
    return dayStr(d.getDay()) + ' ' + d.getDate() + ' ' + monStr(d.getMonth());
  };

  Template.areas.events({
	  
	 'click' : function(e){
		console.log(e.currentTarget);
		var split = e.currentTarget.split("/");
		console.log(split[1]);
	    switch(e.currentTarget){
			case 'li#picu':
			  console.log('picu');
			  swap(e);
			break;
			case 'li#beach':
			  console.log('beach');
			break;
			case 'li#sav':
			  console.log('sav');
			break;
			case 'li#mount':
			  console.log('mount');
			break;
			
			default:
			  console.log('default');
		};
		  
		
		
	  }
  });

}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    
    if(Dialysis.find().count() === 0){
      Dialysis.insert({name:"Luca",age:9,days:[1,3,5]});
      Dialysis.insert({name:"Molly",age:7,days:[1,3,5]});
      Dialysis.insert({name:"Harry",age:13,days:[2,4]});
      Dialysis.insert({name:"Nicholas",age:14,days:[2,4]});
      Dialysis.insert({name:"Rebecca",age:15,days:[1,3,5]});
      Dialysis.insert({name:"Denni",age:15,days:[2,4]});
      Dialysis.insert({name:"George",age:15,days:[2,4]});
      Dialysis.insert({name:"Gulsah",age:16,days:[2,4]});
      Dialysis.insert({name:"Marnie",age:14,days:[2,4]});
    }

    return Meteor.methods({
      removeAllPupils: function(){
        return Dialysis.remove({});
      }
    });

  });
}
//adapted from Meteor leaderboard example by Bernard Mordan
