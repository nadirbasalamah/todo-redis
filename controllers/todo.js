const client = require('../util/redis');

exports.getTodo = (req, res, next) => {
    const id = req.params.id;
    client.hgetall(id, (err, obj) => {
        if(!obj) {
            res.status(404).json({
                message: 'Todo not found!'
            });
        } else {
            res.status(200).json({
                message: 'Todo found!',
                todo: obj
            })
        }
    });
};

exports.addTodo = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;

    client.hgetall(id, (err, obj) => {
        if(!obj) {
            client.hmset(id, [
                'title',title,
                'content',content
            ], (err, reply) => {
                if(err) {
                    console.log(err);
                } else {
                    res.status(201).json({
                        'message': 'Todo created!'
                    });
                }
            });
        } else {
            res.status(403).json({
                message: 'Duplicate ID, todo already exists!',
                todo: obj
            });
        }
    });
};

exports.editTodo = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    client.hgetall(id, (err, obj) => {
        if(!obj) {
            res.status(404).json({
                message: 'Todo not found!'
            });
        } else {
            client.hmset(id, [
                'title',title,
                'content',content
            ], (err, reply) => {
                if(err) {
                    console.log(err);
                } else {
                    res.status(200).json({
                        'message': 'Todo edited!'
                    });
                }
            });
        }
    });
};

exports.deleteTodo = (req, res, next) => {
    const id = req.params.id;
    client.hgetall(id, (err, obj) => {
        if(!obj) {
            res.status(404).json({
                message:'Todo not found!'
            });
        } else {
            client.del(req.params.id);
            res.status(200).json({
                message:'Todo deleted!'
            });
        }
    });
};
