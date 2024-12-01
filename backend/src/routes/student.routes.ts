import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import StudentController from "../controllers/student/student.controller.ts";

const prisma = new PrismaClient();
const studentController = new StudentController(prisma);
const route = Router();

route.get("/", studentController.getStudents);

route.post("/login", studentController.loginStudent);

route.post("/update", studentController.updateStudent);

route.post("/profile", studentController.getStudentProfile);

route.post("/register", studentController.registerStudent);

route.post("/exchange/advantage", studentController.exchangeAdvantage);

route.post("/advantages", studentController.getStudentAdvantages);

route.post("/transactions", studentController.getTransactions);

export default route;
