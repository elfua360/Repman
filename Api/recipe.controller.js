const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const bcrypt = require("bcrypt");
const path = require('path');
const vm = require("v-response");
const RecipeModel = require('./recipe.model');
const fs = require('fs');


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
            .json(vm.ApiResponse(false, 500, "Oops an error occurred", undefined, error));
    })
};

exports.qrcode = (req, res, next) => {
    RecipeModel.findOne({_id: req.params.id}, function(err, result) {
        if (err) {
            return res.status(500)
                .json(vm.ApiResponse(false, 500, "Oops and error occurred"));
        }
        else if (!result) {
            return res.status(409)
                .json(vm.ApiResponse(false, 500, "cannot find recipe"));
        }
        else {
            const generateQR = async text => {
                try {
                    console.log('making a qr code');
                    console.log(await QRCode.toFile('qr-test.png',text, {type: 'png'}));
                } catch (err) {
                    console.error(err);
                }

            }
           // console.log(result.steps.length);
           /* JSONObject jObject = new JSONObject(barcode.displayValue);
            JSONArray blah = jObject.getJSONArray("steps");
            for(int i=blah.length()-1;i>=0;i--){
                JSONObject step = blah.getJSONObject(i);*/
            var steps = {"steps": []};
            for (var i = 0; i < result.steps.length; i++) {
               // steps.push((i+1) + ". " + result.steps[i].step + "\n");
                steps["steps"][i] = {"steps" : result.steps[i].step};
            }
            console.log(JSON.stringify(steps));
           // const payload = JSON.parse(steps);
          //  console.log(JSON.stringify(payload));
           console.log(steps);
            generateQR(JSON.stringify(steps)).then(() => {
                console.log("eat this ass!");
                /*fs.readFile('qr-test.png', function(err,data) {
                   if (err) {
                       return res.status(500)
                           .json(vm.ApiResponse(false, 500, "Oops and error occurred"));
                   }
                    res.header("Content-Type", "image/png");
                   return data;
                }); */
                res.sendFile(path.join(__dirname, "./qr-test.png"));
            });
         //
            //   return <img src={ SERVER_HOST + post.img.path } alt='post image'} />
        }
    });
}

// add recipe
// req.body should contain the full parameters needed to make a recipe
exports.create = (req, res, next) => {

    let recipe_body = req.body;
    //console.log(JSON.stringify(req.body))
    const new_rep = new RecipeModel(recipe_body);
    console.log(new_rep.owner_id + "\t" + new_rep.ingredients);

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

    }, null, {limit: req.body.limit})
        .sort({name: 1})
        .limit(req.body.limit)
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


