import {randomUUID} from "crypto";
import {IdGenerator} from "../../application/common/ports/IdGenerator";

export class UuidGenerator implements IdGenerator {
    generate(): string {
        return randomUUID();
    }
}
