import { PartialType } from "@nestjs/swagger";
import { UpdateHumanDto } from "./update-human.dto";

export class HumanDto extends PartialType( UpdateHumanDto ) {


}
