
# Stripping Properties ....

 app.useGlobalPipes(new ValidationPipe(
    {whitelist: true}
  ));

# src/main.ts .... 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {whitelist: true}
  ));
  await app.listen(3000);
}
bootstrap();


# whitelist: true  ...... will restrict other unknown fields ..... 


# Now the extra field is omitted  when we send a post request with body that contains more data that required .....