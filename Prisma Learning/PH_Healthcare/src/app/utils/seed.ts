import bcrypt from "bcryptjs";
import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";

export const seedSuperAdmin = async () => {
	try {
		const isSuperAdminExist = await prisma.user.findFirst({
			where: {
				role: Role.SUPER_ADMIN,
			},
		});

		if (isSuperAdminExist) {
			console.log(
				"Super Admin is already exist!",
				new Date().toLocaleTimeString(),
			);
			return;
		}

		const name = config.super_admin_name;
		const email = config.super_admin_email;
		const password = config.super_admin_password;

		if (!name || !email || !password) {
			throw new Error(
				"Super Admin Name , Email, Password Missing In Env File!!!",
			);
		}

		const hashedPassword = await bcrypt.hash(password, 8);

		const superAdmin = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				emailVerified: true,
				role: Role.SUPER_ADMIN,
			},
		});

		console.log("Super Admin Has Been Created : ", superAdmin);
	} catch (error) {
		console.log("Error Seeding Super Admin : ", error);

		await prisma.user.delete({
			where: {
				email: config.super_admin_email,
			},
		});
	}
};

export const seedTesterAdmin = async () => {
	try {
		const isTesterAdminExist = await prisma.user.findUnique({
			where: {
				email: config.tester_admin_email,
			},
		});

		if (isTesterAdminExist) {
			console.log(
				"Tester Admin is already exist!",
				new Date().toLocaleTimeString(),
			);
			return;
		}

		const name = config.tester_admin_name;
		const email = config.tester_admin_email;
		const password = config.tester_admin_password;

		if (!name || !email || !password) {
			throw new Error(
				"Tester Admin Name , Email, Password Is Missing In The Env File!!!",
			);
		}

		const hashedPassword = await bcrypt.hash(password, 8);

		const testerAdmin = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: Role.ADMIN,
				emailVerified: true,
				needPasswordChange: false,
			},
		});

		console.log("Tester Admin Has Been Created : ", testerAdmin);
	} catch (error) {
		console.log("Error Seeding Tester Admin : ", error);

		await prisma.user.delete({
			where: {
				email: config.tester_admin_email,
			},
		});
	}
};

export const seedTesterDoctor = async () => {
	try {
		const isTesterDoctorExist = await prisma.user.findUnique({
			where: {
				email: config.tester_doctor_email,
			},
		});

		if (isTesterDoctorExist) {
			console.log(
				"Tester Doctor is already exist!",
				new Date().toLocaleTimeString(),
			);
			return;
		}

		const name = config.tester_doctor_name;
		const email = config.tester_doctor_email;
		const password = config.tester_doctor_password;

		if (!name || !email || !password) {
			throw new Error(
				"Super Admin Name , Email, Password Missing In Env File!!!",
			);
		}

		const hashedPassword = await bcrypt.hash(password, 8);

		const testerDoctor = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: Role.DOCTOR,
				emailVerified: true,
				needPasswordChange: false,
				doctors: {
					create: {
						name,
						email,
						experience: 2,
						licenseNumber: "BMDC0000",
						specialization: "Neurology",
						qualifications: "MBBS",
					},
				},
			},
		});

		console.log("Tester Doctor Has Been Created : ", testerDoctor);
	} catch (error) {
		console.log("Error Seeding Super Admin : ", error);

		await prisma.user.delete({
			where: { email: config.tester_doctor_email },
		});
	}
};
