const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class StoryBookmarkModel {
    tableName = 'story_bookmark';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { whereSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${whereSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { whereSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${whereSet}`;

        const result = await query(sql, [...values]);
        
        // return back the first row (user)
        return result[0];
    }

    create = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `INSERT INTO ${this.tableName} 
        (story_id, user_id, had_bookmarked) VALUES (?,?,?)`;

        const result = await query(sql, [...values, 0]);
        const affectedRows = result ? result.affectedRows : 0;
        
        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);
        
        return result;
    }
}

module.exports = new StoryBookmarkModel;