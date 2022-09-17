const StoryModel = require('../models/story.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Story Controller
 ******************************************************************************/
class StoryController {
    getAllStories = async (req, res, next) => {
        const currentPage = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 1;

        let storyList = await StoryModel.find(currentPage, pageSize);
        if (!storyList.length) {
            throw new HttpException(404, 'Stories not found');
        }

        res.json({
            data: storyList,
            pagination: {
                currentPage: currentPage,
                pageSize: pageSize
            }
        });
    };

    getStoryById = async (req, res, next) => {
        const story = await StoryModel.findOne({ id: req.params.id });
        if (!story) {
            throw new HttpException(404, 'Story not found');
        }

        if((story.is_premium == 1)&&(req.currentUser.role == 'General')){
            res.send(story.content.substr(0, 10) + "...read the rest of this story with premium account");
        } else {
            res.send(story);
        }
    };

    createStory = async (req, res, next) => {
        const result = await StoryModel.create(req.body, { user_id: req.currentUser.id });

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Story was created!');
    };

    updateStory = async (req, res, next) => {
        const story = await StoryModel.findOne({ id: req.params.id });
        if (!story) {
            throw new HttpException(404, 'Story not found');
        }

        if (story.user_id != req.currentUser.id) {
            res.send('Only the author of this story can update it');
        } else {
            const result = await StoryModel.update(req.body, req.params.id);

            if (!result) {
                throw new HttpException(404, 'Something went wrong');
            } 
        
            const { affectedRows, changedRows, info } = result;
        
            const message = !affectedRows ? 'Story not found' :
                affectedRows && changedRows ? 'Story updated successfully' : 'Updated faild';
        
            res.send({ message, info });
        }
    };

    deleteStory = async (req, res, next) => {
        const story = await StoryModel.findOne({ id: req.params.id });
        if (!story) {
            throw new HttpException(404, 'Story not found');
        }

        if (story.user_id != req.currentUser.id) {
            res.send('Only the author of this story can delete it');
        } else {
            const result = await StoryModel.delete(req.params.id);
            if (!result) {
                throw new HttpException(404, 'Story not found');
            }
            res.send('Story deleted successfully');
        }
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new StoryController;