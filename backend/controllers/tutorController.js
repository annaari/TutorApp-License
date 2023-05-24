import Tutor from "../model/Tutor.js";

const getAllTutors = async (req, res) => {
    const tutors = await Tutor.find();
    if(!tutors) return res.status(204).json({'message': 'No tutors found'});
    res.json(tutors);
};

const createNewTutors = async (req, res) => {
    // if(!req?.body?.firstname || !req?.body?.lastname) {
    //     return res.status(400).json({'message': 'First and last names are required!'})
    // }

    // try {
    //     const result = await Employee.create({
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname
    //     });
    //     res.status(201).json(result);
    // } catch (error) {
    //     console.error(error);
    // }
     
};

 const updateTutors = async (req, res) => {
    if(!req?.body?.id) {
        res.status(400).json({ 'message': 'ID is required'})
    }

    // const employee = await Employee.findOne({_id: req.body.id}).exec();

    // if(!employee) {
    //     return res.status(204).json({ 'message': `No employee with id: ${req.body.id}`})
    // }

    // if (req.body?.firstname) employee.firstname = req.body.firstname;
    // if (req.body?.lastname) employee.lastname = req.body.lastname;
   
    // const result = await employee.save();
    // res.json(result);
};

 const deleteTutor = async (req, res) => {
    if(!req?.body?.id) {
        res.status(400).json({ 'message': 'ID is required'})
    }

    const tutor = await Tutor.findOne({_id: req.body.id}).exec();
    if (!tutor) {
        return res.status(204).json({ 'message': `No tutor with id: ${req.body.id}`})
    }
    const result = await tutor.deleteOne({_id: req.body.id})
    res.json(result);
};

const getTutor = async (req, res) => {
    if(!req?.params?.id) {
        res.status(400).json({ 'message': 'ID is required'})
    }

    const tutot = await Tutor.findOne({_id: req.params.id}).exec();
    if (!tutor) {
        return res.status(204).json({ 'message': `No tutor with id: ${req.params.id}`})
    }
    res.json(tutor);
};

export {getAllTutors, getTutor, createNewTutors, updateTutors, deleteTutor}
