import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import TeacherController from "../controllers/teacher/teacher.controller.ts";

const prisma = new PrismaClient();
const teacherController = new TeacherController(prisma);

const route = Router();

route.post("/login", teacherController.loginTeacher);

route.post("/exchange/coins", teacherController.exchangeCoins);

route.post("/transactions", teacherController.getTransactions);

export default route;
