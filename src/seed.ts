import prisma from "./prisma";
import { faker } from '@faker-js/faker';

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password:"bishalmaityismyname"
    },
  });

  // Create recipes associated with the user
  const recipes = Array.from({ length: 20 }).map(() => ({
    userID: user.id,
    name: faker.commerce.productName(),
    method: faker.lorem.paragraphs(3),
    Ingredients: Array.from({ length: 5 }).map(() => faker.commerce.product()),
  }));

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }

  console.log('Database has been seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
