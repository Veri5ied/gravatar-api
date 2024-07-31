import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateContactDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  value: string;
}
