var roleHarvester = require('role_harvey');
var roleUpgrader = require('role_uppity');
var roleBuilder = require('role_bob');
var roleVoyager = require('role_voyager');

module.exports = {
    run: function(spawn)
    {
        var max_harpeys = 3;
        var max_voyagers = 5;
        var max_bobbys = 2;
        
        //dictionary to keep track of the amount of each role
        var num_creeps = {
            harpester: 0,
            voyager: 0,
            bobby: 0
        };
        
        var creep_components = { //1100 to spare at least, soon to be 1300 
            "fat_harvester": [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], //1000 + 
            "harvester": [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], //650
            "upgrader": [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],  //1000 + 
            "builder": [WORK, CARRY, MOVE, MOVE],    //250 + 
            "voyager": [WORK, CARRY, MOVE, MOVE]
        };
        
        for (let name in Game.creeps)
        {
            //count how many creeps there are of every role
            if(Game.creeps[name].memory.role == "harpester")
            {
                num_creeps.harpester++;
                roleHarvester.run(Game.creeps[name], Game.spawns["pawnee"]);
            } else if (Game.creeps[name].memory.role == "voyager")
            {
                num_creeps.voyager++;
                roleVoyager.run(Game.creeps[name], 'W14N43');
            } else if (Game.creeps[name].memory.role == "bobby")
            {
                num_creeps.bobby++;
                roleVoyager.run(Game.creeps[name], 'W14N43');
            }
            
            if(Game.creeps[name].ticksToLive < 10 && Game.creeps[name].carry.energy == 0)
            {
                console.log("'Goodbye cruel world' - " + name);
                Game.creeps[name].suicide();
            }
        }
        
        var current_energy = Game.spawns["pawnee"].room.energyAvailable;
        
        if (current_energy >= 650 && num_creeps.harpester < max_harpeys)
        {
            spawn.spawnCreep(creep_components["harvester"], "harvey" + Math.floor(Math.random() * 1000), {memory: {role: "harpester"}});
            console.log("swear to god me too, no _____ Weinstein - pawnee");
        }
        else if (current_energy >= 250 && num_creeps.voyager < max_voyagers && num_creeps.harpester >= max_harpeys)
        {
            spawn.spawnCreep(creep_components["voyager"], "voyer" + Math.floor(Math.random() * 1000), {memory: {role: "voyager", rightRoom: false, twerking: false}});
            console.log("One who voys. - pawnee");
        }
        else if (current_energy >= 250 && num_creeps.bobby < max_bobbys && num_creeps.harpester >= max_harpeys)
        {
            spawn.spawnCreep(creep_components["builder"], "bob" + Math.floor(Math.random() * 1000), {memory: {role: "bobby"}});
            console.log("YES WE CAN - bob");
        }
    }

};