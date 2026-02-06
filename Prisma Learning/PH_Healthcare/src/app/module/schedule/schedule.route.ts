import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { ScheduleController } from "./schedule.controller";

const scheduleRouter = Router();

scheduleRouter.post(
    '/create-schedule',
    auth(Role.ADMIN, Role.SUPER_ADMIN, Role.PATIENT),
    ScheduleController.createSchedule
)

export default scheduleRouter