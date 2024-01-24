import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'
import { ListUsersUseCase } from '@/users/application/usecasses/listusers.usecase'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class ListUsersDto implements ListUsersUseCase.Input {
  @ApiPropertyOptional({ description: 'Pàgina que sera retornada' })
  @IsOptional()
  page?: number
  @ApiPropertyOptional({ description: 'Quantidade de registros por pàgina' })
  @IsOptional()
  perPage?: number
  @ApiPropertyOptional({
    description: 'Coluna definida para os dados: "name" ou "createdAt"',
  })
  @IsOptional()
  sort?: string
  @ApiPropertyOptional({
    description: 'Ordenação dos dados: crescente ou decrescente',
  })
  @IsOptional()
  sortDir?: SortDirection
  @ApiPropertyOptional({
    description: 'Dado informado para filtrar o resultado',
  })
  @IsOptional()
  filter?: string
}
