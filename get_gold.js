module.exports = {
    run: function(creep)
    {
        var gold = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, "astar");
        if (creep.harvest(gold) == ERR_NOT_IN_RANGE)
            creep.moveTo(gold);
            
        if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity())
            creep.memory.twerking = true;
    }
};