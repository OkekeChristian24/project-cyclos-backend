const { validationResult } = require('express-validator');
const nodemailer = require('../../config/nodemailer.config');
const 
{
    registerUser,
    getUsers,
    getUserById,
    getUserByWallet,
    updateUser,
    deleteUser

} = require('./user.service');

const { insertCode } = require('../../otherServices/confirmation_code.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');


module.exports = {
    registerUser: (req, res) => {
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }

        // Check if wallet is already registered
        getUserByWallet(req.body.wallet, (getErr, getResult) => {
            //
            if(getErr){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database: Query error'
                });
            }

            if(!getResult){
                return res.json({
                    success: 0,
                    message: 'Oops... Something went wrong'
                });
            }

            if(getResult.length !== 0){
                return res.json({
                    success: 0,
                    walletExist: 1,
                    message: 'Wallet has been registered.'
                });
            }

            // Continue registration
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            const token = sign({ email: body.email }, process.env.CONFIRMATION_CODE_SECRET);
            registerUser(body, (err, RegResults) => {
                if(err){
                    console.log(err);
                    return res.json({
                        success: 0,
                        message: 'Database: Query error'
                    });
                }
    
                if(!RegResults){
                    return res.json({
                        success: 0,
                        message: 'Oops... Something went wrong'
                    });
                }
    
                // Set confirmation code into its table
                const codeData = {
                    user_id: RegResults.insertId,
                    code: token
                };
                insertCode(codeData, (err, results) => {
                    if(err){
                        console.log(err);
                        return res.json({
                            success: 0,
                            message: 'Database query error'
                        });
                    }
                    if(!results){
                        return res.json({
                            success: 0,
                            message: 'Query error'
                        });
                    }
    
                    // Send activation email
                    nodemailer.sendConfirmationEmail(body.wallet, body.email, token, (info) => {
    
                        // if(emailErr){
                        //     console.log(emailErr);
                        //     return res.json({
                        //         success: 0,
                        //         message: 'Email: Oops... Something went wrong'
                        //     });
                        // }
                        
                        return res.json({
                            success: 1,
                            message: `Wallet registered. Check ${body.email} for verification code.`
                        });
                    }).catch((emailErr) => {
                        if(emailErr){
                            return res.json({
                                success: 0,
                                message: 'Email: Oops... Something went wrong'
                            });
                        }
                    });
                    
                });
    
    
            });
        });

    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserByWallet: (req, res) => {
        const wallet = req.params.wallet;
        getUserByWallet(wallet, (err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }
        const id = req.params.id;
        const body = req.body;
        updateUser(id, body, (err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                message: 'User updated successfully'
            });
        });

    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.json({
                success: 1,
                data: 'User deleted successfully'
            });
        });
    },
    loginUser: (req, res) => {
        const body = req.body;
        getUserByWallet(body.wallet, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Query error'
                });
            }

            if(results.length === 0){
                return res.json({
                    success: 0,
                    noWallet: 1
                });
            }

            if(results.length !== 1){
                return res.json({
                    success: 0,
                    message: 'Oops... Something went wrong'
                });
            }
            const result = compareSync(body.password, results[0].password);
            if (result) {
                results[0].password = undefined;
                const jsontoken = sign({ result: results[0]}, 'qwe1234', {
                    expiresIn: '24h'
                });
                return res.json({
                    success: 1,
                    message: 'Login successful',
                    token: jsontoken,
                    data: results
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Email or password incorrect'
                });
            }
        });
    }
};
