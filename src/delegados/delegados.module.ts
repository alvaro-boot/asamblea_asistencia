import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delegado } from './delegado.entity';
import { DelegadosController } from './delegados.controller';
import { DelegadosService } from './delegados.service';

@Module({
  imports: [TypeOrmModule.forFeature([Delegado])],
  controllers: [DelegadosController],
  providers: [DelegadosService],
})
export class DelegadosModule {}

