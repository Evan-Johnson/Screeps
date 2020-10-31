var getGold = require('get_gold');
var buildThis = require('build_func');
var returnGold = require('return_gold');
var newRoom = require('new_room');
var roleBob = require('role_bob');

module.exports = {
    run: function(creep, room)
    {
        var return_loc1 = Game.spawns["pawnee"];
        var return_loc2 = creep.room.controller;
        
        if (creep.pos.roomName == room)
            creep.memory.rightRoom = true;
        else
            creep.memory.rightRoom = false;
        
        if (!creep.memory.rightRoom && !creep.memory.twerking) //needs to get gold from new room
            newRoom.run(creep, room);
        else if (creep.memory.rightRoom && creep.memory.twerking) //needs to return gold to old room
            newRoom.run(creep, 'W14N42')
        else
        {   if (creep.memory.role == 'voyager'){
                if (creep.memory.twerking)
                {
                    if (return_loc1.energy < 300)
                        returnGold.run(creep, return_loc1);
                    else
                        returnGold.run(creep, return_loc2);
                    
                    if (creep.carry.energy == 0)
                    {
                        creep.memory.twerking = false;
                        creep.memory.rightRoom = false;
                    }
                } else 
                {
                    getGold.run(creep);
                }
            } else {
                roleBob.run(creep);
            }
        }
        
        //console.log(Game.creeps["voyer13"].memory.rightRoom);
    }
};