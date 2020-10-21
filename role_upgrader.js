module.exports = {
    run: function(creepy)
    {
        //always return to the room controller
        var return_loc = creepy.room.controller;
        
        if(creepy.memory.twerking == undefined) //this should never happen, but just in case
        {
            creepy.memory.twerking = false;
        } else if (creepy.memory.twerking == true && creepy.carry.energy == 0) //once done twerking, set twerking = false
        {
            creepy.memory.twerking = false;
        } else if (creepy.memory.twerking == false && creepy.carry.energy <= creepy.carryCapacity) //while twerking is false:
        {
            if (creepy.carry.energy == creepy.carryCapacity) //if max capacity, move to upgrader and once you get there: twerking = true
            {
                if (creepy.upgradeController(return_loc) == ERR_NOT_IN_RANGE )
                {
                    creepy.moveTo(return_loc);
                } else
                {
                    creepy.moveTo(return_loc);
                    creepy.memory.twerking = true;
                }
            } else //if < max capacity: continue harvesting resources
            {
                var gold = creepy.pos.findClosestByPath(FIND_SOURCES);
                if (gold == undefined)
                {
                    creepy.moveTo(28, 29);
                }
                
                if (creepy.harvest(gold) == ERR_NOT_IN_RANGE)
                {
                    creepy.moveTo(gold);
                }
            }
        } else if (creepy.memory.twerking == true) //if twerking = true, upgrade the controller
        {
            if (creepy.upgradeController(return_loc) == ERR_NOT_IN_RANGE)
            {
                creepy.moveTo(return_loc);
            }
        }
    }
};