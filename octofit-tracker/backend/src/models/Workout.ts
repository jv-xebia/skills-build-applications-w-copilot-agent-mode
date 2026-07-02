import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, trim: true },
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
