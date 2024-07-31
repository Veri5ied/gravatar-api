import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class ContactDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class ContactItemDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDTO)
  contact: ContactDTO[];
}
