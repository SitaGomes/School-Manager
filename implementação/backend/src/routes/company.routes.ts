import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CompanyController from "../controllers/company/company.controller.ts";

const prisma = new PrismaClient();
const companyController = new CompanyController(prisma);
const route = Router();

route.get("/", companyController.getCompanies);

route.post("/login", companyController.loginCompany);

route.post("/register", companyController.registerCompany);

route.post("/profile", companyController.getCompanyProfile);

route.post("/profile/update", companyController.updateCompanyProfile);

route.post("/advantage", companyController.getCompanyAdvantages);

route.post("/advantage/register", companyController.createCompanyAdvantage);

route.post("/advantage/update", companyController.updateCompanyAdvantage);

route.post("/advantage/delete", companyController.deleteCompanyAdvantage);

route.post("/advantage/students", companyController.getCompanyStudents);

export default route;
