//

var type_of_structure = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return ((structure.type == STRUCTURE_WALL) && (structure.hits < 1000))
    }
})


//
