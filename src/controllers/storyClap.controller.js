const StoryClapModel = require('../models/storyClap.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              StoryClap Controller
 ******************************************************************************/
class StoryClapController {
    getStoryClapById = async (req, res, next) => {
        const clap = await StoryClapModel.find({ story_id: req.params.id });
        if (!clap) {
            throw new HttpException(404, 'Story not found');
        }

        let sum = 0;
        clap.forEach(function(item) {
            sum += item.clap_count;
        });
        res.send(sum.toString());
    };

    getUserClapForStory = async (req, res, next) => {
        const clap = await StoryClapModel.find({ story_id: req.params.id });
        if (!clap) {
            throw new HttpException(404, 'User not found');
        }

        let result;
        
        result += clap[0].user_id;
        for (let i=1; i<clap.length; i++){
            result += ', ' + clap[i].user_id;
        };
        
        res.send({ user_id: result });
    };

    clapForStory = async (req, res, next) => {
        const clap = await StoryClapModel.findOne({ story_id: req.params.id, user_id: req.currentUser.id });
       
        if(!clap){
            const result = await StoryClapModel.create({ story_id: req.params.id, user_id: req.currentUser.id });
            const clapCount = 1;
            res.status(201).send('You clapped for this story!');        
        }

        const clapCount = clap.clap_count + 1;
        const result = await StoryClapModel.update({ clap_count: clapCount }, clap.id);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('You clapped for this story! +' + clapCount);
    };
}


/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new StoryClapController;