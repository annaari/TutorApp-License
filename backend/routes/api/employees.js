import express from 'express';
// import data from '../../model/employees.js';
import * as employeesCtrl from '../../controllers/employeesController.js'
import verifyJWT from '../../middleware/verifyJWT.js';
import ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';

const router = express.Router();
// datas.employees = data();

router.route('/')
    .get(employeesCtrl.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesCtrl.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesCtrl.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesCtrl.deleteEmployee)

router.route('/:id')
    .get(employeesCtrl.getEmployee)

export default router;