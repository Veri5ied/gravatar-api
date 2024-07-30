import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class AccountFieldDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateAccountDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountFieldDto)
  account: AccountFieldDto[];
}
