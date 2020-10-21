var creepyControl = require('creepy_controller');
var towerControl = require('tower_controller');


module.exports.loop = function () 
{
    //run creep manager
    creepyControl.run(Game.spawns.SPAWNY);
    var tower_structure = Game.spawns.SPAWNY.room.find(FIND_STRUCTURES, {
       filter: (structure) => {
           return (structure.structureType == STRUCTURE_TOWER)
       } 
    });
    
    //console.log(tower_structure);
    //run tower manager
    towerControl.run(tower_structure[0]);
    
};