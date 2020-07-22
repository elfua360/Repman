const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const vm = require("v-response");
const RecipeModel = require('./recipe.model');


// list of all recipes per given owner_id, limits to whatever user sets as limit
exports.find = (req, res, next) => {
    RecipeModel.find({owner_id: req.body.owner_id})
        .sort({name: 1})
        .limit(req.body.limit)
        .then((response) => {
            if (!response) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "User has no recipes"))
            } else {

                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "success", response))
            }
        }).catch(error => {
        return res.status(500)
            .json(vm.ApiResponse(false, 500, "Oops an error occur", undefined, error));
    })
};

// add recipe
// req.body should contain the full parameters needed to make a recipe
exports.create = (req, res, next) => {

    let recipe_body = req.body;
    //console.log(JSON.stringify(req.body))
    const new_rep = new RecipeModel(recipe_body);
    console.log(new_rep.name)
    new_rep.save()
        .then((saved) => {
            if (!saved) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "an error occur please try again"));
            } else {
                return res.status(201)
                    .json(vm.ApiResponse(true, 201, "recipe added to database", saved));
            }
        }).catch(error => {
            return res.status(500)
                .json(vm.ApiResponse(false, 500, "an error occur please try again", error));
            })

};


exports.delete = (req, res, next) => {

    // TODO: check if this is a list, we could do bulk removal.
    let id_to_remove = req.body.id;
    RecipeModel.remove(
        { _id: id_to_remove }
    )
        .then(result => {
            return res.status(201)
                .json(vm.ApiResponse(true, 201, "recipe deleted from database"));
            })
        .catch(error=> {
            return res.status(500)
                .json(vm.ApiResponse(false, 500, error));
            }
        )

};

exports.update = (req, res, next) => {

    // TODO: check if this is a list, we could do bulk removal.
    let id_to_update = req.body.id
    RecipeModel.findOneAndUpdate(
        { _id: id_to_update },
        {
            $set: req.body

        },
        {
            upsert: true
        }


    )
        .then(result => {
            return res.status(201)
                .json(vm.ApiResponse(true, 201, result));
        })
        .catch(error=> {
                return res.status(500)
                    .json(vm.ApiResponse(false, 500, error));
            }
        )

};


exports.search = (req, res, next) => {

    // left anchored regex partial search. 
    let query = req.body.query
    let requery = '^' + query
    RecipeModel.find({
        $and: [
                {owner_id: req.body.owner_id},
                {$or: [
                    {name: {$regex: requery, $options: 'i'} },
                    {tags: {$elemMatch: {$regex: requery, $options: 'i'}} }
                    ]}
            ]

    })
        .then(result => {
            return res.status(201)
                .json(vm.ApiResponse(true, 201, result));
        })
        .catch(error=> {
                return res.status(500)
                    .json(vm.ApiResponse(false, 500, error));
            }
        )

};


