import { Request, Response } from "express";

import { ImageUploaderExpress } from "../../../context/Users/application/ImageUploader";
import { UpdateUser } from "../../../context/Users/application/updateUser";
import { UserRepository } from "../../../context/Users/domain/userRepository.interface";
import { Controller } from "../controller.interface";

export class UploadUserImageController implements Controller {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async run(req: Request, res: Response): Promise<void> {
    const files = req.files;
    const email = req.body.email;
    const uuid = req.body.uuid;

    try {
      const uploader = new ImageUploaderExpress();
      const imagePath = await uploader.upload(files, email);

      const userUploader = new UpdateUser(this.userRepository);
      await userUploader.update(uuid, { image: imagePath });

      res.json({ ok: true });
    } catch (error) {
      let statusCode = 500;

      if (error.statusCode) statusCode = error.statusCode;

      res.status(statusCode).json({
        ok: false,
        error: error.message,
      });
    }
  }
}
