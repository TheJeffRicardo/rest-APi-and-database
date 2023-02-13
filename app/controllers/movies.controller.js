const db = require("../modals")
const Movies = db.movies

exports.create = (req, res) =>{
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty"
        })
        return
    }
    // Create a Movie
    const movies = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }
    // Save Movie in the database
    Movies.create(movies)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error has occurred while creating the Movie"
        })
    })
}

exports.findAll = (req, res) =>{
    const title = req.query.title
    var condition = title ? { title: { [Op.like]: `%${title}%`}} : null

    Movies.findAll({ where: condition })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error has occurred while retrieving movies"
        })
    })
}
exports.findOne = (req, res) =>{
    const id = req.params.id

    Movies.findByPk(id)
    .then(data => {
        if(data){
            res.send(data)
        }else{
            res.status(404).send({
                message: `Cannot find Movie with id = ${id}`
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Error retrieving Movie with id =" + id
        })
    })
}
exports.update = (req, res) =>{
    const id = req.params.id

    Movies.update(req.body, {
        where: {id: id}
    })
    .then(num=> {
        if(num == 1) {
            res.send({
                message: "Movie was updated successfully"
            })
        }else{
            res.send({
                message: `Cannot update Movie with id=${id}.Maybe Movie was not found or req.body is empty`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Movie with id=" + id
        })
    })
}
exports.delete = (req, res) =>{
    const id = req.params.id

    Movies.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Movie was deleted successfully"
            })
        }else {
            res.send({
                message: `Cannot delete Movie with id=${id}. Maybe Tutorial was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Movie with id=" + id
        })
    })
}
exports.deleteAll = (req, res) =>{
    Movies.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: `${nums} Movies were deleted successfully!`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || " Some error occurred while removing all tutorials"
        })
    })
}
exports.findAllPublished = (req, res) =>{
    Movies.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
}