import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

const updateProfilePicService = async (buffer: Buffer, userId: string) => {
	const currUser = await prisma.user.findUnique({
		where: { id: userId },
		select: { imagePublicId: true, image: true },
	});

	const uploadResult = await new Promise<UploadApiResponse>((res, rej) => {
		cloudinary.uploader
			.upload_stream(
				{
					resource_type: "image",
				},
				(error, result) => {
					if (error) {
						return rej(error);
					}

					if (!result) {
						return rej(error);
					}

					res(result);
				},
			)
			.end(buffer);
	});

	const updateUser = await prisma.user.update({
		where: { id: userId },
		data: {
			image: uploadResult.secure_url,
			imagePublicId: uploadResult.public_id,
		},
		omit: { password: true },
	});

	// Delete previous image
	if (currUser?.imagePublicId || currUser?.image) {
		await cloudinary.uploader.destroy(currUser.imagePublicId as string);
	}

	return updateUser;
};

export const UserServices = {
	updateProfilePicService,
};
