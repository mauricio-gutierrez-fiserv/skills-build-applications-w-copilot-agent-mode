import mongoose, { Schema, type Document } from 'mongoose';

export type UserDocument = Document & {
  name: string;
  email: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  age: number;
  city: string;
  weeklyGoal: string;
};

export type TeamDocument = Document & {
  name: string;
  sport: string;
  members: number;
  goal: string;
  captain: string;
};

export type ActivityDocument = Document & {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  distanceKm: number;
  date: Date;
};

export type LeaderboardDocument = Document & {
  rank: number;
  name: string;
  points: number;
  streak: number;
};

export type WorkoutDocument = Document & {
  title: string;
  type: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focusArea: string;
  coach: string;
};

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    weeklyGoal: { type: String, required: true },
  },
  { timestamps: true }
);

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: { type: Number, required: true },
    goal: { type: String, required: true },
    captain: { type: String, required: true },
  },
  { timestamps: true }
);

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
    coach: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);
export const Activity =
  mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model<LeaderboardDocument>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);
