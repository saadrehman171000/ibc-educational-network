import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Seed Classes
  const classes = [
    { name: 'Beginner', order: 1 },
    { name: 'Step 1', order: 2 },
    { name: 'Step 2', order: 3 },
    { name: 'Step 3', order: 4 },
    { name: 'Class 1', order: 5 },
    { name: 'Class 2', order: 6 },
    { name: 'Class 3', order: 7 },
    { name: 'Class 4', order: 8 },
    { name: 'Class 5', order: 9 },
    { name: 'Class 6', order: 10 },
    { name: 'Class 7', order: 11 },
    { name: 'Class 8', order: 12 },
  ]

  console.log('📚 Seeding Classes...')
  for (const classData of classes) {
    await prisma.class.upsert({
      where: { name: classData.name },
      update: {},
      create: classData,
    })
  }

  // Seed Subjects
  const subjects = [
    'English',
    'Urdu',
    'Mathematics',
    'Science',
    'Social Studies',
    'Islamic Studies',
    'General Knowledge',
    'Drawing',
    'Handwriting',
    'Computer',
  ]

  console.log('📖 Seeding Subjects...')
  for (const subjectName of subjects) {
    await prisma.subject.upsert({
      where: { name: subjectName },
      update: {},
      create: { name: subjectName },
    })
  }

  // Seed Series
  const series = [
    'KG',
    'Early Learner',
    'Primary Series',
    'Elementary Series',
    'Advanced Series',
    'Foundation Series',
    'Core Series',
  ]

  console.log('📑 Seeding Series...')
  for (const seriesName of series) {
    await prisma.series.upsert({
      where: { name: seriesName },
      update: {},
      create: { name: seriesName },
    })
  }

  console.log('✅ Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 