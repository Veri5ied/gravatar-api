import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class WalletDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class WalletItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WalletDTO)
  wallet: WalletDTO[];
}

export class UpdateWalletDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  value: string;
}
