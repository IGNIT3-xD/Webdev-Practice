import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
	node_env: process.env.NODE_ENV,
	port: process.env.PORT,
	database_url: process.env.DATABASE_URL,
	bak_url: process.env.APP_URL,
	frontend_url: process.env.FRONTEND_URL,
	bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
	jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
	jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
	jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
	jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
	google_client_id: process.env.GOOGLE_CLIENT_ID as string,
	super_admin_name: process.env.SUPER_ADMIN_NAME as string,
	super_admin_email: process.env.SUPER_ADMIN_EMAIL as string,
	super_admin_password: process.env.SUPER_ADMIN_PASSWORD as string,
	tester_admin_name: process.env.TESTER_ADMIN_NAME as string,
	tester_admin_email: process.env.TESTER_ADMIN_EMAIL as string,
	tester_admin_password: process.env.TESTER_ADMIN_PASSWORD as string,
	tester_doctor_name: process.env.TESTER_DOCTOR_NAME as string,
	tester_doctor_email: process.env.TESTER_DOCTOR_EMAIL as string,
	tester_doctor_password: process.env.TESTER_DOCTOR_PASSWORD as string,
};
