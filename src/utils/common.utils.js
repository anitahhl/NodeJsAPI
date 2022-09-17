exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(', ');
    whereSet = keys.map(key => `${key} = ?`).join(' AND ');

    // specific whereset
    if(whereSet.match('___')){
        if(whereSet.match('_0')){
            whereSet = whereSet.replace('___0 =', ' <')

        } else if(whereSet.match('_1')){
            whereSet = whereSet.replace('___1 =', ' >')
        }
    }

    return {
        columnSet,
        whereSet,
        values
    }
}