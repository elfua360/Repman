const RegisterModel = require('./register.model');
const vm = require("v-response");

// list of all successful registrations (user)
exports.find = (req, res, next) => {
    RegisterModel.find()
        .sort({createdAt: -1})
        .then((response) => {
            if (!response) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "Unable to find users"))
            } else {

                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "success", response))
            }
        }).catch(error => {
        return res.status(500)
            .json(vm.ApiResponse(false, 500, "Oops an error occur", undefined, error));
    })
};

exports.deleteOne = (req, res, next) => {
    RegisterModel.deleteOne({_id: req.params.id})
        .then(deleted => {
            if (!deleted) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "Unable to delete user with provided id"))
            } else if (deleted) {
                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "success", deleted))
            }
        }).catch(error => {
        return  res.status(500)
            .json(vm.ApiResponse(false, 500, "server error", undefined, error));
    })
};

//find a user by id
/*exports.findOne = (req, res, next) => {
    RegisterModel.findOne({_id: req.params.id})
        .then(found => {
            if (!found) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "unable to find a user with provided id"))
            } else if (found) {
                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "success", found))
            }
        }).catch(error => {
        return res.status(500)
            .json(vm.ApiResponse(false, 500, "Server error", undefined, error));
    })

};*/
