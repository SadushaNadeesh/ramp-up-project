import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { ExportModule } from './export/export.module';
import { SocketclusterService } from './socketcluster/socketcluster.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    VehicleModule,
    ExportModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketclusterService],
})
export class AppModule { }
