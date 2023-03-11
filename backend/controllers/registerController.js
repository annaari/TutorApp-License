import User from '../model/User.js';
import Tutor from '../model/Tutor.js';
import bcrypt from 'bcrypt';
import ROLES_LIST from '../config/roles_list.js';

const handleNewUser = async (req, res) => {
    const {email, pwd, pwdConfirm, role} = req.body;

    if(!email || !pwd || !pwdConfirm || !role) return res.status(400).json({'message': 'E-mail, role, password and password confirmation are required.'});

    // check for duplicate
    const duplicate = await User.findOne({email: email}).exec();

    if(duplicate) return res.sendStatus(400);
    if(pwd !== pwdConfirm) return res.status(400).json({'message': 'The passwords are not identical.'});
    if(ROLES_LIST.Student !== role && ROLES_LIST.Tutor !== role) return res.status(400).json({'message': 'Invalid role.'});

    try {
        // encrypt the pwd
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        // create and store the new user
        const result = await User.create({
            "email": email, 
            "password": hashedPwd, 
            "role": role
        });

        console.log(result);
        res.status(201).json({'success': result._id})
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
}

const getUserById = async (req, res) => {
    console.log(req?.params?.id)
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const createTutor = async (req, res) => {
    const information = req.body;
}

// const setUserRole = async (req, res) => {
//     const { id, role } = req.body;
//     if(!id || !role) return res.status(400).json({'message': 'User id and role are required.'});

//     const foundUser = await User.findOne({_id: id}).exec();
//     if (!foundUser) {
//         return res.status(204).json({ 'message': `No employee with id: ${id}`})
//     }
//     console.log(ROLES_LIST.Student, ROLES_LIST.Tutor,role )

//     if(ROLES_LIST.Student !== role && ROLES_LIST.Tutor !== role) return res.status(400).json({'message': 'Invalid role.'});

//     foundUser.role = role;
   
//     const result = await foundUser.save();
//     res.json(result);
// }

export {handleNewUser, getUserById};
