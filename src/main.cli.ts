import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KindergartenService } from './kindergarten/kindergarten.service';
import * as readline from 'readline';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const service = appContext.get(KindergartenService);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('=== KERGARTEN CONSOLE CLI (NestJS) ===');
  console.log('Доступні команди:');
  console.log('  list  - показати список дітей у черзі');
  console.log('  add   - додати запис');
  console.log('  delete   - видалити запис');
  console.log('  exit  - вийти з програми');
  console.log('----------------------------------------');

  const promptUser = () => {
    rl.question('\nВведіть команду (list, add, delete, exit): ', (cmd) => {
      switch (cmd.trim()) {
        case 'list':
          console.log('\nПоточна черга:', service.getAll());
          promptUser();
          break;

        case 'add':
          rl.question('Ім`я дитини: ', (childName) => {
            rl.question('Вік (1-6): ', (ageStr) => {
              rl.question('Email одного з батьків: ', (parentEmail) => {
                try {
                  const newChild = service.create({
                    childName,
                    age: parseInt(ageStr, 10),
                    parentEmail,
                  });
                  console.log('\nЗапис додано:', newChild);
                } catch (e: unknown) {
                  console.log(
                    '\nПомилка при додаванні запису:',
                    e instanceof Error ? e.message : String(e),
                  );
                }
                promptUser();
              });
            });
          });
          break;

        case 'delete':
          rl.question('Введіть id запису який треба видалити: ', (id) => {
            try {
              service.delete(id);
              console.log('Запис видалено успішно');
            } catch (e: unknown) {
              console.log(
                '\nПомилка при видаленні запису:',
                e instanceof Error ? e.message : String(e),
              );
            }
            promptUser();
          });
          break;

        case 'exit':
          console.log('Вихід...');
          rl.close();
          appContext.close();
          process.exit(0);
          break;

        default:
          console.log('Такої команди немає. Використовуйте: list, add, exit');
          promptUser();
          break;
      }
    });
  };

  promptUser();
}
bootstrap();
