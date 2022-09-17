const CommentModel = require('../models/comment.model');
const CommentClapModel = require('../models/commentClap.model');
const StoryModel = require('../models/story.model');
const UserModel = require('../models/user.model');

const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Comment Controller
 ******************************************************************************/
class CommentController {
    getAllComments = async (req, res, next) => {
        const currentPage = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 1;

        const commentList = await CommentModel.find({ parent_id: 0, target_id: req.params.id }, currentPage, pageSize);    
        if (!commentList) {
            throw new HttpException(404, 'Comment not found');
        }

        for(const comment of Object.entries(commentList)){
            const findClapCount = await CommentClapModel.findOne({ comment_id: comment[1].id, user_id: req.currentUser.id });
            let selfClapCount = 0;
            if (findClapCount){
                selfClapCount = findClapCount.clap_count;
            }
            
            const reply = await CommentModel.find({ parent_id___1: 0, target_id: comment[1].id }, currentPage, pageSize);
            comment[1]['self_clap_count'] = selfClapCount;
            comment[1]['replies'] = reply;
        }

        res.json({
            data: commentList,
            pagination: {
                currentPage: currentPage,
                pageSize: pageSize
            }
        });
    };

    createComment = async (req, res, next) => {
        const user = await UserModel.findOne({ id: req.currentUser.id });
        
        if(req.body.parent_id == 0){
            const target = await StoryModel.findOne({ id: req.body.target_id });
            if (!target) {
                throw new HttpException(404, 'Target story not found');
            }       
        } else {
            const target = await CommentModel.findOne({ id: req.body.target_id });
            if (!target) {
                throw new HttpException(404, 'Target comment not found');
            }
            const replyCount = await CommentModel.update({ reply_count: target.reply_count + 1 }, target.id);
        }

        const result = await CommentModel.create(req.body, { user_id: user.id, user_name: user.first_name + user.last_name });
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send({ status: 1, message: 'Comment was created!' });
    };

    updateComment = async (req, res, next) => {
        const comment = await CommentModel.findOne({ id: req.params.id });
        if (!comment) {
            throw new HttpException(404, 'Comment not found');
        }

        if (comment.user_id != req.currentUser.id) {
            res.send(404, { status: 0, message: 'Only the author of this comment can update it' });
        } else {
            const result = await CommentModel.update(req.body, req.params.id);

            if (!result) {
                throw new HttpException(404, 'Something went wrong');
            } 
        
            const { affectedRows, changedRows, info } = result;
        
            const message = !affectedRows ? 'Comment not found' :
                affectedRows && changedRows ? 'Comment updated successfully' : 'Updated faild';
        
            res.send(201, { status: 1, message, info });
        }
    };

    deleteComment = async (req, res, next) => {
        const comment = await CommentModel.findOne({ id: req.params.id });
        if (!comment) {
            throw new HttpException(404, 'Comment not found');
        }

        if (comment.user_id != req.currentUser.id) {
            res.send(404, { status: 0, message: 'Only the author of this comment can delete it' });
        } else {
            const result = await CommentModel.delete(req.params.id);
            if (!result) {
                throw new HttpException(404, 'Comment not found' );
            }
            res.send(201, { status: 1, message: 'Comment deleted successfully' });
        }
    };

    getAllReplies = async (req, res, next) => {
        const currentPage = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 1;

        const commentList = await CommentModel.find({ parent_id___1: '0', target_id: req.params.id }, currentPage, pageSize);    
        if (!commentList) {
            throw new HttpException(404, 'Comment not found');
        }

        for(const comment of Object.entries(commentList)){
            const findClapCount = await CommentClapModel.findOne({ comment_id: comment[1].id, user_id: req.currentUser.id });
            let selfClapCount = 0;
            if (findClapCount){
                selfClapCount = findClapCount.clap_count;
            }
            
            const reply = await CommentModel.find({ parent_id___1: 0, target_id: comment[1].id }, currentPage, pageSize);
            comment[1]['self_clap_count'] = selfClapCount;
            comment[1]['replies'] = reply;
        }
        
        res.json({
            data: commentList,
            pagination: {
                currentPage: currentPage,
                pageSize: pageSize
            }
        });
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CommentController;