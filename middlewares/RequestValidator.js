const Categories = require("./../model/Category")

let validateReqForCategoryName = async (req, res, next) => {
    if(!req.body.name){
        res.status(400).send({
            message : "Category name is required"
        });
    }
    next();
}

let validateReqForCategoryId = async (req,res,next) => {
    let id = req.params.categoryId;
    if(id) {
        let category = await Categories.findByPk(id);
        if(!category){
            res.status(400).send({
                message : "Category doesn't exist"
            })
        }
    }else {
        res.status(400).send({
            message : "Category Id is missing"
        })
    }
    next();
}

module.exports = { validateReqForCategoryName, validateReqForCategoryId };