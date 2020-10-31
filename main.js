var creepyControl = require('creepy_controller');
var towerControl = require('tower_controller');
var newRoomController = require('new_room_creepy_controller')


module.exports.loop = function () 
{
    //run creep manager
    creepyControl.run(Game.spawns.SPAWNY);
    newRoomController.run(Game.spawns.pawnee);
    
    var tower_structure = Game.spawns.SPAWNY.room.find(FIND_STRUCTURES, {
       filter: (structure) => {
           return (structure.structureType == STRUCTURE_TOWER)
       } 
    });
    
    var tower_structure2 = Game.spawns.pawnee.room.find(FIND_STRUCTURES, {
       filter: (structure) => {
           return (structure.structureType == STRUCTURE_TOWER)
       } 
    });
    
    //console.log(tower_structure.length);
    //run tower manager
    for (var i = 0; i < tower_structure.length; i++)
    {
       towerControl.run(tower_structure[i], Game.spawns.SPAWNY);
    }
    
    for (var i = 0; i < tower_structure2.length; i++)
    {
        //console.log(tower_structure2[i]);
        towerControl.run(tower_structure2[i], Game.spawns.pawnee);
    }
    //temp
    //Game.creeps["claimer"].claimController(room.controller);
    
    
};