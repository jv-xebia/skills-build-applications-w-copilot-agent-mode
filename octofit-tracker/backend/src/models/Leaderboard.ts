import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Schema.Types.ObjectId;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
