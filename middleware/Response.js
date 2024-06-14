export const responseFormat = (req, res, next) => {
    res.formatResponse = (data, code = 200, message = 'Success') => {
        const response = {
            Code: code,
            Message: message,
            Response: data
        };
        res.status(code).json(response);
    };
    next();
};