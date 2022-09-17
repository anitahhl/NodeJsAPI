const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class CommentModel {
    tableName = 'comment';

    find = async (params = {}, currentPage, pageSize) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { whereSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${whereSet} LIMIT ` + (currentPage - 1) * pageSize + `, ` + pageSize;
        
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

    create = async ({ target_id, parent_id, content, created_at, updated_at }, { user_id, user_name }) => {
        const sql = `INSERT INTO ${this.tableName}
        (user_id, user_name, target_id, parent_id, content, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql, [user_id, user_name, target_id, parent_id, content, new Date(), new Date()]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet}, updated_at=? WHERE id = ?`;

        const result = await query(sql, [...values, new Date(), id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new CommentModel;