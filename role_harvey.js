var getGold = require('get_gold');
var returnGold = require('return_gold');

module.exports = {
    run: function(creep, spawn)
    {
        var return_loc1 = spawn;
        //console.log(spawn);
        var return_loc2 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity
        });
        var return_loc3 = creep.room.controller;
        
        if (creep.memory.twerking)
        {
            if (return_loc1.energy < 300)
                returnGold.run(creep, return_loc1);
            else if (return_loc2 != null)
                returnGold.run(creep, return_loc2);
            else
                returnGold.run(creep, return_loc3);
        } else
        {
            getGold.run(creep);
        }
    }
};