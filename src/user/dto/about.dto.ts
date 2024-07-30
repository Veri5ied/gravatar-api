import { IsArray, IsOptional, IsString } from 'class-validator';

export class AboutDto {
  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  profileUrl?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  pronunciation?: string;

  @IsString()
  @IsOptional()
  pronouns?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsArray()
  @IsOptional()
  interests?: [];
}
