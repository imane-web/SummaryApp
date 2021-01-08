const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Summaries = require('../models/resume');
var authenticate = require('../authenticate');


const SummaryRouter = express.Router();

SummaryRouter.use(bodyParser.json());

SummaryRouter.route('/')
.get((req,res,next) => {
    Summaries.find({})
    .populate('comments.author')
    .then((Summaries) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Summaries);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Summaries.create(req.body)
    .then((summary) => {
        console.log('Summary Created ', summary);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(summary);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Summaries');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Summaries.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

SummaryRouter.route('/:summaryId')
.get((req,res,next) => {
    Summaries.findById(req.params.SummaryId)
    .populate('comments.author')
    .then((Summary) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Summary);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Summaries/'+ req.params.SummaryId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Summaries.findByIdAndUpdate(req.params.SummaryId, {
        $set: req.body
    }, { new: true })
    .then((Summary) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Summary);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Summaries.findByIdAndRemove(req.params.SummaryId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

SummaryRouter.route('/:SummaryId/comments')
.get((req,res,next) => {
    Summaries.findById(req.params.SummaryId)
    .populate('comments.author')
    .then((Summary) => {
        if (Summary != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Summary.comments);
        }
        else {
            err = new Error('Summary ' + req.params.SummaryId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Summaries.findById(req.params.SummaryId)
    .then((Summary) => {
        if (Summary != null) {
            require.body.author = req.user._id;
            Summary.comments.push(req.body);
            Summary.save()
            .then((Summary) => {
                    Summaries.findById(Summary._id)
                    .populate('comments.author')
                    .then(Summary =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(Summary);
                    })
                                
            }, (err) => next(err));
        }
        else {
            err = new Error('Summary ' + req.params.SummaryId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Summaries/'
        + req.params.SummaryId + '/comments');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Summaries.findById(req.params.SummaryId)
    .then((Summary) => {
        if (Summary != null) {
            for (var i = (Summary.comments.length -1); i >= 0; i--) {
                Summary.comments.id(Summary.comments[i]._id).remove();
            }
            Summary.save()
            .then((Summary) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Summary);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Summary ' + req.params.SummaryId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

SummaryRouter.route('/:SummaryId/comments/:commentId')
.get((req,res,next) => {
    Summaries.findById(req.params.SummaryId)
    .populate('comments.author')
    .then((Summary) => {
        if (Summary != null && Summary.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Summary.comments.id(req.params.commentId));
        }
        else if (Summary == null) {
            err = new Error('Summary ' + req.params.SummaryId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Summaries/'+ req.params.SummaryId
        + '/comments/' + req.params.commentId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Summaries.findById(req.params.SummaryId)
    .then((Summary) => {
        if (Summary != null && Summary.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                Summary.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                Summary.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            Summary.save()
            .then((Summary) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Summary);                
            }, (err) => next(err));
        }
        else if (Summary == null) {
            err = new Error('Summary ' + req.params.SummaryId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Summaries.findById(req.params.SummaryId)
    .then((Summary) => {
        if (Summary != null && Summary.comments.id(req.params.commentId) != null) {
            Summary.comments.id(req.params.commentId).remove();
            Summary.save()
            .then((Summary) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Summary);                
            }, (err) => next(err));
        }
        else if (Summary == null) {
            err = new Error('Summary ' + req.params.SummaryId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = SummaryRouter;