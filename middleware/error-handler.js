module.exports = handleError = (error) => {
    let errors = {};
    
    // duplicate key error
    if (error.code === 11000) {
        errors.email = 'email already exists';
        return errors;
    }
    // validation error
    if (error.name === "ValidationError") {
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        return errors;
    }
};



