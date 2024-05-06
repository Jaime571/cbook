import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CredencialesService } from './credenciales.service';
import { CreateCredentialDto } from './dto/credenciales.dto';
import * as bcrypt from 'bcrypt';


@Controller('credenciales')
export class CredencialesController {
  constructor(private credencialesService: CredencialesService) {}

  @Post('crear')
  create(@Body() body: CreateCredentialDto): Promise<CreateCredentialDto> {
    return this.credencialesService.create(body);
  }

@Post('login')
async login(@Body() body: { codigo: string, password: string }) {
    const { codigo, password } = body;
    const credencial = await this.credencialesService.findOne(codigo);

    if (!credencial) {
      return { success: false, message: "Código incorrecto" };
    }
    const match = await bcrypt.compare(password, credencial.password);

    if (match) {
      return { success: true, message: "¡Inicio de sesión exitoso!" };
    } else {
      return { success: false, message: "Contraseña incorrecta" };
    }
  }

  @Get(':codigo')
  getOne(@Param('codigo') codigo: string): Promise<CreateCredentialDto> {
    return this.credencialesService.findOne(codigo);
  }
}
