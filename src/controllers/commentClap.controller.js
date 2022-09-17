const CommentClapModel = require('../models/commentClap.model');
const CommentModel = require('../models/comment.model');

const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              CommentClap Controller
 ******************************************************************************/
class CommentClapController {
    clapForComment = async (req, res, next) => {
        const clap = await CommentClapModel.findOne({ comment_id: req.params.id, user_id: req.currentUser.id });

        if(!clap){
            const result = await CommentClapModel.create({ comment_id: req.params.id, user_id: req.currentUser.id });
            const to_comment = await CommentModel.update({ comment_id: req.params.id, clap_count: 1 });
            res.status(201).send('You clapped for this comment! +1');        
        }
        
        const clapCount = clap.clap_count + 1;
        const result = await CommentClapModel.update({ clap_count: clapCount }, clap.id);
        const to_comment = await CommentModel.update({ clap_count: clapCount + 1 }, clap.comment_id);
        if (!result || !to_comment) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('You clapped for this comment! +' + clapCount);
    };
}


/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CommentClapController;