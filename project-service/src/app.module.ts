import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './controllers/project.controller';
import { ProjectDao } from './dao/project.dao';
import { ProjectService } from './services/project.service';
import { Project, ProjectSchema } from './shemas/project.shema';

const databaseProvider =  {
  provide: 'databaseProvider',
  useFactory: async (config: ConfigService) => {
    return { uri: config.get('DATABASE_CONNECTION')}
  },
  inject: [ ConfigService],
}; 
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync(databaseProvider),
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema }
    ])
  ],
  controllers: [AppController,ProjectController],
  providers: [AppService,ProjectService,ProjectDao],
})
export class AppModule {}
