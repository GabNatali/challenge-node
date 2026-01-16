import {User} from "../../../domain/user/entities/User";
import {Email} from "../../../domain/user/value-objects/Email";
import {UserRepository} from "../../../domain/user/repository/UserRepository";
import {RegisterUserRequestDTO, RegisterUserResponseDTO} from "../dto/RegisterUserDTO";
import {UserAlreadyExistsError} from "../../../domain/user/errors/UserAlreadyExistsError";
import {JwtSigner} from "../../auth/ports/JwtSigner";
import {IdGenerator} from "../../common/ports/IdGenerator";


export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly idGenerator: IdGenerator,
        private readonly jwtSigner: JwtSigner

    ) { }

    async execute(input: RegisterUserRequestDTO ): Promise<RegisterUserResponseDTO> {
        const email = Email.create(input.email);

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) throw new UserAlreadyExistsError();

        const user = User.create({
            id: this.idGenerator.generate(),
            email,
        });

        const token = this.jwtSigner.sign({sub: user.id, email: user.email.getValue()});

        await this.userRepository.save(user);

        return {
            id: user.id,
            email: user.email.getValue(),
            createdAt: user.createdAt.toISOString(),
            token: token,
        };
    }
}
