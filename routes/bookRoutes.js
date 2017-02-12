var express = require('express');

var routes = function(Book) {
    var bookRouter = express.Router();
    bookRouter.route('/')
        .get(function(req, res) {
            var query = {};

            if(req.query.genre)
                query.genre = req.query;

            Book.find(query, function(err, books) {
                if(err) {
                    // console.log(err);
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            });
        })
        .post(function(req, res) {
            var book = new Book(req.body);
            console.log(book);
            book.save();
            res.status(201).send(book);
        });

    bookRouter.route('/:bookId')
        .get(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(book);
                }
            });
        })
        .put(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.genre = req.body.genre;
                    book.read = req.body.read;
                    book.save(function(err) {
                        if(err)
                            res.status(500).send(err);
                        else
                            res.json(book);
                    });
                }
            });
        })
        .patch(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {
                if(err) {
                    res.status(500).send(err);
                }
                else {
                    // console.log(req.body);
                    if(req.body._id)
                        delete req.body._id;
                    for(var key in req.body) {
                        book[key] = req.body[key];
                    }
                    book.save(function(err) {
                        if(err)
                            res.status(500).send(err);
                        else
                            res.json(book);
                    });
                }
            });
        });

    return bookRouter;
};

module.exports = routes;
