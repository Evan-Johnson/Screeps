var roleHarvester = require('role_harvey');
var roleUpgrader = require('role_uppity');
var roleBuilder = require('role_bob');
var roleVoyager = require('role_voyager');

//add how many creeps total in dict
//run all functions
//build new creeps
module.exports = {
    run: function(spawny)
    {
        var print = false;
        
        //max amounts of creeps per role initially
        var max_harvesters = 4;
        var max_upgraders = 4;
        var max_builders = 1;
        var max_voyagers = 4;
        
        //dictionary to keep track of the amount of each role
        var num_creeps = {
            recovery: 0,
            harvester: 0,
            upgrader: 0,
            builder: 0,
            voyager: 0
        };
        
        //creep_components will get higher and higher as more and more extensions are put in place
        var creep_components = { //1100 to spare at least, soon to be 1300 
            "fat_harvester": [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], //1000 + 
            "harvester": [WORK, MOVE, CARRY, CARRY], //250
            "upgrader": [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],  //1000 + 
            "builder": [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],    //1000 + 
            "voyager": [WORK, CARRY, MOVE, MOVE]
        };
        
        //loop to change max_creeps if necessary, count num of current creeps, and commit suicide
        for (let name in Game.creeps)
        {
            //count how many creeps there are of every role
            if(Game.creeps[name].memory.role == "recovery")
            {
                num_creeps.recovery++;
                roleHarvester.run(Game.creeps[name], Game.spawns["SPAWNY"]);
            }else if (Game.creeps[name].memory.role == "harvester")
            {
                num_creeps.harvester++;
                roleHarvester.run(Game.creeps[name], Game.spawns["SPAWNY"]);
            } else if (Game.creeps[name].memory.role == "upgrader")
            {
                num_creeps.upgrader++;
                roleUpgrader.run(Game.creeps[name]);
            } else if (Game.creeps[name].memory.role == "builder")
            {
                num_creeps.builder++;
                roleBuilder.run(Game.creeps[name]);
            } else if (Game.creeps[name].memory.role == 'voyager')
            {
                num_creeps.voyager++;
                roleVoyager.run(Game.creeps[name], 'W14N42');
            } else 
            {
                
            }
            
            //if a creep has less than 90 ticks to live and has no energy, commit suicide to reduce wasted resources
            if(Game.creeps[name].ticksToLive < 90 && Game.creeps[name].carry.energy == 0)
            {
                console.log("'Goodbye cruel world' - " + name);
                Game.creeps[name].suicide();
            }
        }
        
        var current_energy = Game.spawns["SPAWNY"].room.energyAvailable;
        //var ext = filter(Game.structures, function(structure){
        //    if (structure.structureType == STRUCTURE_EXTENSION){
        //        current_energy += structure.energy;
        //    }
        //})
        //var extensions = spawny.room.find(FIND_STRUCTURES, {
        //    filter: (s) => (s.structureType == STRUCTURE_EXTENSION)
        //});
        
        //console.log(extensions[0].energy);
        
        
        
        //console.log(current_energy);
        
        //this is where the creeps are spawned if theyre are not enough current creeps in the room
        if (current_energy >= 1000 && num_creeps.harvester < max_harvesters)
        {
            spawny.spawnCreep(creep_components["fat_harvester"], "fat_harvey" + Math.floor(Math.random() * 1000), {memory: {role: "harvester"}});
            console.log("swear to god me too, no _____ Weinstein");
        } else if (current_energy >= 1000 && num_creeps.builder < max_builders && num_creeps.harvester >= max_harvesters)
        {
            spawny.spawnCreep(creep_components["builder"], "fat_bob" + Math.floor(Math.random() * 1000), {memory: {role: "builder"}});
            console.log("CAN WE FIX IT?!");
        } else if (current_energy >= 1000 && num_creeps.upgrader < max_upgraders && num_creeps.harvester >= max_harvesters)
        {
            spawny.spawnCreep(creep_components["upgrader"], "fat_uppity" + Math.floor(Math.random() * 1000), {memory: {role: "upgrader"}});
            console.log("it smells like uppity in here");
        } else if (current_energy >= 250 && Object.keys(Game.creeps).length < 2)
        {
            spawny.spawnCreep(creep_components["harvester"], "recovery_harvey" + Math.floor(Math.random() * 1000), {memory: {role: "recovery"}});
            console.log("recovery unit in bound");
        }
        
        if (print)
        {
            console.log("Total creeps alive: " + Object.keys(Game.creeps).length);
            console.log("Total harvesters: " + num_creeps.harvester);
            console.log("Total builders: " + num_creeps.builder);
            console.log("Total upgraders: " + num_creeps.upgrader);
            console.log("Total recovery: " + num_creeps.recovery);
            console.log("Total voyagers: " + num_creeps.voyager);
        }
        
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
            console.log("Total voyagers: " + num_creeps.voyager);
        }
    }
};