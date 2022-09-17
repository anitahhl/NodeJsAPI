const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');


const userRouter = require('./routes/user.route');
const followRouter = require('./routes/follow.route');
const storyRouter = require('./routes/story.route');
const clapRouter = require('./routes/clap.route');
const bookmarkRouter = require('./routes/bookmark.route');
const commentRouter = require('./routes/comment.route');


// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.use(bodyParser.urlencoded({ extened: false }));
app.use(bodyParser.json());

const port = Number(process.env.PORT || 3000);


app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/follow`, followRouter);
app.use(`/api/v1/stories`, storyRouter);
app.use(`/api/v1/clap`, clapRouter);
app.use(`/api/v1/bookmark`, bookmarkRouter);
app.use(`/api/v1/comments`, commentRouter);


// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}!`)
});


module.exports = app;