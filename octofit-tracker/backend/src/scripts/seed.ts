import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';
import { connectToDatabase } from '../config/database.js';

// Seed the octofit_db database with test data.
// Seed the octofit_db database with test data.
async function seedDatabase() {
  console.log('Connecting to MongoDB...');
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Patel', email: 'ava@example.com', age: 29, city: 'Seattle', fitnessGoal: 'Half marathon' },
    { name: 'Noah Kim', email: 'noah@example.com', age: 31, city: 'Austin', fitnessGoal: 'Strength training' },
    { name: 'Mia Chen', email: 'mia@example.com', age: 27, city: 'Denver', fitnessGoal: 'Weight loss' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Momentum', sport: 'Running', members: [users[0]._id, users[1]._id], description: 'Early morning runners' },
    { name: 'Peak Power', sport: 'CrossFit', members: [users[2]._id], description: 'Strength and conditioning crew' },
  ]);

  await Activity.insertMany([
    { user: users[0]._id, type: 'Run', durationMinutes: 35, caloriesBurned: 420, date: new Date('2026-07-01') },
    { user: users[1]._id, type: 'Cycling', durationMinutes: 50, caloriesBurned: 610, date: new Date('2026-07-02') },
    { user: users[2]._id, type: 'Yoga', durationMinutes: 30, caloriesBurned: 180, date: new Date('2026-07-02') },
  ]);

  await Leaderboard.insertMany([
    { user: users[0]._id, score: 1420, rank: 1 },
    { user: users[1]._id, score: 1310, rank: 2 },
    { user: users[2]._id, score: 1285, rank: 3 },
  ]);

  await Workout.insertMany([
    { name: 'HIIT Circuit', difficulty: 'Intermediate', durationMinutes: 25, focus: 'Cardio' },
    { name: 'Core Builder', difficulty: 'Beginner', durationMinutes: 20, focus: 'Core' },
    { name: 'Trail Endurance', difficulty: 'Advanced', durationMinutes: 45, focus: 'Stamina' },
  ]);

  console.log('Seed complete. Inserted users, teams, activities, leaderboard, and workouts.');
}

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
