import express from 'express';
// import data from '../../model/employees.js';
import * as tutorCtrl from '../../controllers/tutorController.js'
import verifyJWT from '../../middleware/verifyJWT.js';
import ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';

const router = express.Router();
// datas.employees = data();

router.route('/')
    .get(tutorCtrl.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Tutor),tutorCtrl.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Tutor, ROLES_LIST.Editor),tutorCtrl.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Tutor), tutorCtrl.deleteEmployee)

router.route('/:id')
    .get(tutorCtrl.getEmployee)

export default router;