import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@octofit.example',
        fitnessLevel: 'advanced',
        age: 29,
        city: 'Seattle',
        weeklyGoal: 'Complete 4 long runs and 2 strength sessions',
      },
      {
        name: 'Leo Martinez',
        email: 'leo.martinez@octofit.example',
        fitnessLevel: 'intermediate',
        age: 34,
        city: 'Austin',
        weeklyGoal: 'Hit 120 active minutes and improve cycling pace',
      },
      {
        name: 'Mina Patel',
        email: 'mina.patel@octofit.example',
        fitnessLevel: 'beginner',
        age: 26,
        city: 'Denver',
        weeklyGoal: 'Build consistency with 3 workouts and a 10K walk',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        sport: 'Running',
        members: 12,
        goal: 'Increase weekly distance while improving recovery',
        captain: 'Ava Thompson',
      },
      {
        name: 'Core Crew',
        sport: 'Strength',
        members: 9,
        goal: 'Strength consistency and form quality',
        captain: 'Leo Martinez',
      },
      {
        name: 'Sunrise Sprinters',
        sport: 'HIIT',
        members: 15,
        goal: 'Speed and endurance for race prep',
        captain: 'Mina Patel',
      },
    ]);

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMinutes: 42,
        calories: 510,
        distanceKm: 8.4,
        date: new Date('2026-09-17'),
      },
      {
        userId: users[1]._id,
        type: 'strength',
        durationMinutes: 35,
        calories: 420,
        distanceKm: 0,
        date: new Date('2026-09-16'),
      },
      {
        userId: users[2]._id,
        type: 'cycling',
        durationMinutes: 60,
        calories: 680,
        distanceKm: 22.1,
        date: new Date('2026-09-15'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, name: 'Ava Thompson', points: 1280, streak: 12 },
      { rank: 2, name: 'Leo Martinez', points: 1195, streak: 9 },
      { rank: 3, name: 'Mina Patel', points: 1110, streak: 7 },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Cardio Blast',
        type: 'Cardio',
        difficulty: 'advanced',
        durationMinutes: 30,
        focusArea: 'Interval conditioning',
        coach: 'Coach Rivera',
      },
      {
        title: 'Mobility Reset',
        type: 'Recovery',
        difficulty: 'beginner',
        durationMinutes: 20,
        focusArea: 'Mobility and flexibility',
        coach: 'Coach Kim',
      },
      {
        title: 'Strength Circuit',
        type: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 40,
        focusArea: 'Lower body and core',
        coach: 'Coach Singh',
      },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded activities:', activities.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
