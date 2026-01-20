import {UserNotFoundError} from "../../../domain/user/errors/UserNotFoundError";
import {UserRepository} from "../../../domain/user/repository/UserRepository";
import {LoginResponseDTO} from "../dto/LoginDTO";
import {JwtSigner} from "../ports/JwtSigner";


export class LoginByUserIdUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtSigner: JwtSigner
    ) {}

    async execute(userId: string): Promise<LoginResponseDTO> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new UserNotFoundError();
        const token = this.jwtSigner.sign({
            sub: user.id,
            email: user.email.getValue(),
        });
        return {
            user: {
                id: user.id,
                email: user.email.getValue(),
            },
            token: token,
        };
    }
}
