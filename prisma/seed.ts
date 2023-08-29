const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const projectType = [
  "UCFE",
  "IFE",
  "DCD",
  "FSF",
  "PP1",
  "PP2",
  "PP3",
  "PP4",
  "PP5",
];

const sessionType = [
  "Intro",
  "Project inception",
  "Middle of Project",
  "End of Project",
  "Postponed (Valid)",
  "**No-show**",
  "Interview preparation and career advice",
  "Other",
];

async function main() {
  for (let i = 0; i < projectType.length; i++) {
    await prisma.projectType.create({
      data: {
        name: projectType[i],
        order: i + 1, // Optionally set the order if you want
      },
    });
  }

  for (let i = 0; i < sessionType.length; i++) {
    await prisma.sessionType.create({
      data: {
        name: sessionType[i],
        order: i + 1, // Optionally set the order if you want
      },
    });
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });