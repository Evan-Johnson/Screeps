var getGold = require('get_gold');
var returnGold = require('return_gold');

module.exports = {
    run: function(creep)
    {
        var return_loc = creep.room.controller;
        
        if (creep.memory.twerking)
            returnGold.run(creep, return_loc);
        else
            getGold.run(creep);
    }
};