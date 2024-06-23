import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import AdminController from "../controllers/admin/admin.controller.ts";

const prisma = new PrismaClient();
const adminController = new AdminController(prisma);
const route = Router();

route.post("/login", adminController.loginAdmin);

route.post("/register", adminController.registerAdmin);

route.get("/school", adminController.getSchools);

route.post("/school/register", adminController.registerSchool);

route.post("/school/edit", adminController.updateSchool);

route.post("/school/teacher", adminController.getTeachers);

route.post("/school/delete", adminController.deleteSchool);

route.post("/school/teacher/register", adminController.registerTeacher);

route.post("/school/teacher/addCoins", adminController.addCoins);

route.post("/school/teacher/edit", adminController.updateTeacher);

route.post("/school/teacher/delete", adminController.deleteTeacher);

export default route;
