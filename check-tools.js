const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTools() {
  const count = await prisma.tool.count({ where: { published: true } });
  console.log('Published tools count:', count);
  
  const tools = await prisma.tool.findMany({ 
    where: { published: true },
    take: 5,
    include: { category: true }
  });
  console.log('Sample tools:', tools.map(t => ({ name: t.name, category: t.category?.name, published: t.published })));
  
  await prisma.$disconnect();
}

checkTools().catch(console.error);
