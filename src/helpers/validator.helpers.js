import { validationResult } from 'express-validator';

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        return res.status(400).json({ errors: err.array() });
    }
};

export default validateResult;
