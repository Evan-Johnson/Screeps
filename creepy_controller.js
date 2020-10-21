var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');

//add how many creeps total in dict
//run all functions
//build new creeps
module.exports = {
    run: function(spawny)
    {
        //max amounts of creeps per role initially
        var max_harvesters = 4;
        var max_upgraders = 4;
        var max_builders = 3;
        
        //dictionary to keep track of the amount of each role
        var num_creeps = {
            harvester: 0,
            upgrader: 0,
            builder: 0
        };
        
        //creep_components will get higher and higher as more and more extensions are put in place
        var creep_components = {
            "harvester": [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], //700 + 50 extra
            "upgrader": [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],  //700 + 50 extra
            "builder": [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]    //700 + 50 extra
        };
        
        //loop to change max_creeps if necessary, count num of current creeps, and commit suicide
        for (let name in Game.creeps)
        {
            //if there are no construction sites: less builders more harvesters
            if(Game.creeps[name].pos.findClosestByPath(FIND_CONSTRUCTION_SITES) == null)
            {
                max_upgraders = 6;
                max_builders = 2;
            }
            
            //count how many creeps there are of every role
            if(Game.creeps[name].memory.role == "undefined")
            {
                Game.creeps[name].memory.role = "harvester";
            }else if (Game.creeps[name].memory.role == "harvester")
            {
                num_creeps.harvester++;
                roleHarvester.run(Game.creeps[name]);
            } else if (Game.creeps[name].memory.role == "upgrader")
            {
                num_creeps.upgrader++;
                roleUpgrader.run(Game.creeps[name]);
            } else if (Game.creeps[name].memory.role == "builder")
            {
                num_creeps.builder++;
                roleBuilder.run(Game.creeps[name]);
            }
            
            //if a creep has less than 90 ticks to live and has no energy, commit suicide to reduce wasted resources
            if(Game.creeps[name].ticksToLive < 90 && Game.creeps[name].carry.energy == 0)
            {
                console.log("'Goodbye cruel world' - " + name);
                Game.creeps[name].suicide();
            }
        }
        
        //this is where the creeps are spawned if theyre are not enough current creeps in the room
        if (spawny.energy >= 250 && num_creeps.harvester < max_harvesters)
        {
            spawny.spawnCreep(creep_components["harvester"], "fat_harvey" + Math.floor(Math.random() * 1000), {memory: {role: "harvester"}});
            console.log("max harveys: " + max_harvesters);
            num_creeps.harvester++;
            console.log("# of harveys: " + num_creeps.harvester);
        } else if (spawny.energy >= 250 && num_creeps.builder < max_builders)
        {
            spawny.spawnCreep(creep_components["builder"], "fat_bob" + Math.floor(Math.random() * 1000), {memory: {role: "builder"}});
            console.log("max builders: " + max_builders);
            num_creeps.builder++;
            console.log("# of builders: " + num_creeps.builder);
        } else if (spawny.energy >= 250 && num_creeps.upgrader < max_upgraders)
        {
            spawny.spawnCreep(creep_components["upgrader"], "fat_uppity" + Math.floor(Math.random() * 1000), {memory: {role: "upgrader"}});
            console.log("max upgraders: " + max_upgraders);
            num_creeps.upgrader++;
            console.log("# of upgraders: " + num_creeps.upgrader);
        }else {
            
            //console.log("Number of harveys: " + num_creeps.harvester);
            //console.log("Number of uppity's: " + num_creeps.upgrader);
        }
        
        //console.log("Total creeps alive: " + Object.keys(Game.creeps).length);
        //console.log("Total harvesters: " + num_creeps.harvester);
        //console.log("Total builders: " + num_creeps.builder);
        //console.log("Total upgraders: " + num_creeps.upgrader);
        
        //an hourly check on the room and how many total creeps there are along with specific roles
        var hour = new Date();
        //console.log(hour);
        //hour.getMinutes() === 0 && hour.getSeconds <= 3
        if (hour.getMinutes() == 0 && hour.getSeconds() <= 3)
        {
            console.log("Total creeps alive: " + Object.keys(Game.creeps).length);
            console.log("Total harvesters: " + num_creeps.harvester);
            console.log("Total builders: " + num_creeps.builder);
            console.log("Total upgraders: " + num_creeps.upgrader);
        }
    }
};