import { BaseRepository } from "../../core/baseRepository.js";
import { UserModel, type User } from "./user.model.js";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email });
  }
}
