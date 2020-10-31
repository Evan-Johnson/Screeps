module.exports = {
    run: function(creep, room)
    {
        //console.log(creep.pos.roomName);
        //console.log(room);
        creep.moveTo(new RoomPosition(33, 20, room));
        
        if (creep.pos.roomName != room)
        {
            creep.memory.rightRoom = false;
        } else 
        {
            creep.memory.rightRoom = true;
        }
    }
};