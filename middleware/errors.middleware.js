const { validationResult } = require("express-validator");

const handleValidationErrors = message => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errors: errors.array(),
            message
        });
    }
    next();
};

module.exports = handleValidationErrors;
