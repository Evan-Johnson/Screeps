module.exports = {
    run: function(creepy)
    {
        var return_loc;
        if (Game.spawns.SPAWNY.energy == 300) //if spawn is full, find extensions to fill up
        {
            return_loc = creepy.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity
            });
            
            if (return_loc == null) //if the spawn and extensions are full, return energy to the room controller
            {
                
                return_loc = creepy.room.controller;
            }    
        } else //when spawns not full, set it as return location
        {
            return_loc = Game.spawns.SPAWNY;
        }
        
            
        if(creepy.memory.twerking == undefined) //this should never happen
        {
            creepy.memory.twerking = false;
        }else if (creepy.memory.twerking == true && creepy.carry.energy == 0) //once done working, set twerking = false
        {
            creepy.memory.twerking = false;
        } else if (creepy.memory.twerking == false && creepy.carry.energy <= creepy.carryCapacity) //when twerking = false
        {
            if (creepy.carry.energy == creepy.carryCapacity) //if max capacity either move to return_loc or set twerking = true (based on position)
            {
                //|| creepy.upgradeController(return_loc) == ERR_NOT_IN_RANGE
                if (creepy.transfer(return_loc, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE )
                {
                    //console.log(return_loc);
                    creepy.moveTo(return_loc);
                } else
                {
                    creepy.memory.twerking = true;
                }
            } else //if capacity < max and twerking is false: gather more resources
            {
                var gold = creepy.pos.findClosestByPath(FIND_SOURCES);
                
                if (creepy.harvest(gold) == ERR_NOT_IN_RANGE)
                {
                    creepy.moveTo(gold);
                }
            }
        } else if (creepy.memory.twerking == true) //while twerking is true, transfer resources to return_loc
        {
            if (creepy.transfer(return_loc, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE )
            {
                creepy.moveTo(return_loc);
            } 
        }
    }
};