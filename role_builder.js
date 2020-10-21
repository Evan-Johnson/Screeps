module.exports = {
    run: function(creepy)
    {   
        //creepy.memory.twerking = false;
        
        //creepy.moveTo(28, 7);
        
        //find the closest construction site and store it in return_loc
        var return_loc = creepy.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        //console.log(return_loc);
        //if there are no construction sites currently, return an array of all the towers that are not at max energy capacity
        if (return_loc == null)
        {
            return_loc = creepy.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
            });
            
            //if all the towers are at max capacity (highly unlikely), then return_loc = room controller for upgrading
            if (return_loc == null)
            {
                return_loc = creepy.room.controller;
            }
        }
        
        //console.log(return_loc);
            //console.log(creepy.memory.twerking);
            //twerking should never be undefined, but just in case: set it = false
            if(creepy.memory.twerking == undefined)
            {
                creepy.memory.twerking = false;
            }else if (creepy.memory.twerking == true && creepy.carry.energy == 0) //when bob is done building, set twerking = false
            {
                creepy.memory.twerking = false;
            } else if (creepy.memory.twerking == false && creepy.carry.energy <= creepy.carryCapacity) //when bob is not working 
            {
                if (creepy.carry.energy == creepy.carryCapacity) //if his carry capacity is full:
                {
                    if(return_loc == creepy.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)) //if there are still buildings to build, start building them and moving closer to them while setting working = true
                    {
                        if (creepy.build(return_loc) == ERR_NOT_IN_RANGE )
                        {
                            creepy.moveTo(return_loc);
                        } else
                        {
                            creepy.moveTo(return_loc);
                            creepy.memory.twerking = true;
                        }
                    } else //if there are no buildings to be built, start transferring energy either to the tower or to the room controller and set working = true
                    {
                        if(creepy.transfer(return_loc, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                        //creepy.transfer(return_loc[0], RESOURCE_ENERGY);
                            creepy.moveTo(return_loc);
                        } else {
                            creepy.moveTo(return_loc);
                            creepy.memory.twerking = true;
                        }
                    }
                } else //if his carry capacity isn't full and he is not working: keep retreiving resources 
                {
                    var gold = creepy.pos.findClosestByPath(FIND_SOURCES);
                    if (gold == undefined)
                    {
                        //creepy.moveTo(32, 8);
                    }
                    
                    if (creepy.harvest(gold) == ERR_NOT_IN_RANGE)
                    {
                        creepy.moveTo(gold);
                    }
                }
            } else if (creepy.memory.twerking == true) //while twerking: either build or transfer your resources to the nearest building
            {
                if (return_loc == creepy.pos.findClosestByPath(FIND_CONSTRUCTION_SITES))
                {
                    if(creepy.build(return_loc) == ERR_NOT_IN_RANGE)
                    {
                        creepy.moveTo(return_loc);
                    }
                }    
                else 
                {
                    creepy.transfer(return_loc, RESOURCE_ENERGY);
                    creepy.moveTo(return_loc);
                }
            }
    }
};