import { IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsString()
  name: string;

  @IsString()
  value?: string;
}
