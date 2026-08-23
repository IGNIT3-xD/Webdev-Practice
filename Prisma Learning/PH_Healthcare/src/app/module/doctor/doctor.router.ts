import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { upload } from "../../lib/multer";

const doctorRouter = Router();

doctorRouter.post(
    '/apply-as-doctor',
    upload.fields([
        {
            name: "resume",
            maxCount: 1
        },
        {
            name: "additionalFiles",
            maxCount: 3
        }
    ]),
    DoctorController.applyAsDoctor
)

export default doctorRouter