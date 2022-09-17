const UserFollowModel = require('../models/userFollow.model');
const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              UserFollow Controller
 ******************************************************************************/
class UserFollowController {
    getFollowers = async (req, res, next) => {
        const currentPage = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 1;

        const follow = await UserFollowModel.find({ user_id: req.params.id, had_followed: 0 }, currentPage, pageSize);
        if(!follow){
            throw new HttpException(404, "This user don't have followers");
        }

        let result = '';
        result += follow[0].follower_id;
        for (let i=1; i<follow.length; i++){
            result += ', ' + follow[i].follower_id;
        };

        res.json({
            follower_id: result,
            pagination: {
                currentPage: currentPage,
                pageSize: pageSize
            }
        });
    };

    getFollows = async (req, res, next) => {
        const currentPage = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 1;

        const follow = await UserFollowModel.find({ follower_id: req.params.id, had_followed: 0 }, currentPage, pageSize);
        if (!follow) {
            throw new HttpException(404, 'Users not found');
        }

        let result = '';
        result += follow[0].user_id;
        for (let i=1; i<follow.length; i++){
            result += ', ' + follow[i].user_id;
        };
        
        res.json({
            user_id: result,
            pagination: {
                currentPage: currentPage,
                pageSize: pageSize
            }
        });
    };

    followUser = async (req, res, next) => {
        const follow = await UserFollowModel.findOne({ user_id: req.params.id, follower_id: req.currentUser.id });
        
        if(!follow){
            const checkuser = await UserModel.findOne({ id: req.params.id });
            if (!checkuser)
            throw new HttpException(404, 'User not found'); 

            const result = await UserFollowModel.create({ user_id: req.params.id, follower_id: req.currentUser.id });
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
            res.status(201).send('You followed this user!');
        
        } else if(follow.had_followed == 0) {
            const result = await UserFollowModel.update({ had_followed: 1 }, follow.id);
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
            res.status(201).send('You unfollowed this user!');
        
        } else {
            const result = await UserFollowModel.update({ had_followed: 0 }, follow.id);
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
            res.status(201).send('You followed this user!');
        }
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserFollowController;