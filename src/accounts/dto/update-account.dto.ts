import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class UpdateAccountFieldDto {
  @IsString()
  name: string;

  @IsString()
  value?: string;
}

export class UpdateAccountDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAccountFieldDto)
  account: UpdateAccountFieldDto[];
}
