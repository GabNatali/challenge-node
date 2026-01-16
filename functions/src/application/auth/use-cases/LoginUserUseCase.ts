import {UserRepository} from "../../../domain/user/repository/UserRepository";
import {LoginRequestDTO, LoginResponseDTO} from "../dto/LoginDTO";
import {Email} from "../../../domain/user/value-objects/Email";
import {UserNotFoundError} from "../../../domain/user/errors/UserNotFoundError";
import {JwtSigner} from "../ports/JwtSigner";


export class LoginUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtSigner: JwtSigner
    ) {}

    async execute(input: LoginRequestDTO): Promise<LoginResponseDTO> {
        const email = Email.create(input.email);

        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new UserNotFoundError;
        const token = this.jwtSigner.sign({
            sub: user.id,
            email: user.email.getValue(),
        });
        return {
            token: token,
        };
    }
}
