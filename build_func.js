module.exports = {
    run: function(creep, return_loc)
    {
        if (creep.build(return_loc, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            creep.moveTo(return_loc);
        
        if (creep.store[RESOURCE_ENERGY] == 0)
                creep.memory.twerking = false;
    }
};