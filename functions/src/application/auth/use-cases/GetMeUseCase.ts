import {UserNotFoundError} from "../../../domain/user/errors/UserNotFoundError";
import {UserRepository} from "../../../domain/user/repository/UserRepository";
import {MeResponseDTO} from "../dto/MeDTO";


export class GetMeUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userId: string): Promise<MeResponseDTO> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new UserNotFoundError();

        return {
            id: user.id,
            email: user.email.getValue(),
            createdAt: user.createdAt.toISOString(),
        };
    }
}
