const StoryBookmarkModel = require('../models/storyBookmark.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              StoryBookmark Controller
 ******************************************************************************/
class StoryBookmarkController {
    getMyBookmark = async (req, res, next) => {
        const bookmark = await StoryBookmarkModel.find({ user_id: req.currentUser.id, had_bookmarked: 0 });
        if (!bookmark) {
            throw new HttpException(404, 'Story not found');
        }

        let result = '';
        result += bookmark[0].story_id;
        for (let i=1; i<bookmark.length; i++){
            result += ', ' + bookmark[i].story_id;
        };
        
        res.send({ story_id: result });
    };

    addBookmark = async (req, res, next) => {
        const bookmark = await StoryBookmarkModel.findOne({ story_id: req.params.id, user_id: req.currentUser.id });
        
        if(!bookmark){
            const result = await StoryBookmarkModel.create({ story_id: req.params.id, user_id: req.currentUser.id });
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
            res.status(201).send('You bookmarked this story!');

        } else if(bookmark.had_bookmarked == 0){
            const result = await StoryBookmarkModel.update({ had_bookmarked: 1 }, bookmark.id);
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
            res.status(201).send('Bookmarking canceled');

        } else {
            const result = await StoryBookmarkModel.update({ had_bookmarked: 0 }, bookmark.id);
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
            res.status(201).send('You bookmarked this story!');
        }
    };
}


/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new StoryBookmarkController;