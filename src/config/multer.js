const { request } = require("express")
const multer = require('multer')
const path = require('path')
const crypto = require('crypto') 
const { hash } = require("bcrypt")
const { findOne } = require("../controller/ongController")


module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null,path.resolve(__dirname, '..', '..', 'uploads'),);
        }
        ,
        filename: (req, file, cb) => {
            crypto.randomBytes(10,(err, hash) => {
                if(err) cb(err);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null,filename)
            });
        },
    }),
    limits: {
        fileSize: 5 * 1024 *1024, 
    }, 
    
};