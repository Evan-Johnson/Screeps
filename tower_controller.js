module.exports = {
    run: function(tower)
    {
        //create an array of all the structures that can be healed
        var repairs = Game.spawns.SPAWNY.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        
        //sort the array by immediate need
        repairs.sort((a, b) => a.hits - b.hits);
        
        //repair those structures
        tower.repair(repairs[0]);
    }
};