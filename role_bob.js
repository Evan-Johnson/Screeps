var getGold = require('get_gold');
var buildThis = require('build_func');
var returnGold = require('return_gold');

module.exports = {
    run: function (creep)
    {
        var return_loc1 = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        var return_loc2 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
        }, "astar");
        //var return_loc3 = room.controller;
            
        if (creep.memory.twerking)
        {
            if (return_loc1 != null)
                buildThis.run(creep, return_loc1);
            else
                returnGold.run(creep, return_loc2);
        } else 
        {
            getGold.run(creep);
        }
    }
};