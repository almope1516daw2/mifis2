import mongoose from "mongoose";
import jwt from "jsonwebtoken";


let UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    salt: String,
    hash: String,
    type: String
});

UserSchema.set('toJSON', {getters: true});

let User = mongoose.model('User', UserSchema);

exports.UserSchema = User;

function getUserById(id) {
    return new Promise((resolve, reject) => {
        User.findOne({id: id}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

exports.getUserById = getUserById;

exports.updateUser = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.getListOfUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


exports.generateJwt = () => {

    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);


    return jwt.sign({
        _id: this._id,
        name: this.name,
        surname: this.surname,
        mail: this.mail,

        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
};


exports.addRegister = ({name, surname, mail, image, salt, hash}) => {
    var newUser = new User({
        name: name,
        surname: surname,
        mail: mail,
        image: image,
        salt: salt,
        hash: hash

    });
    return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


exports.searchLogin = ({mail, salt, hash}) => {
    return new Promise((resolve, reject) => {

        User.findOne({mail: mail}, function (err, person) {
            //console.log(person.mail);
            err ? reject(err) : resolve(person);
        });
    });



}