import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// prevent duplicate request
referralSchema.index(
  { user: 1, job: 1 },
  { unique: true }
);

export default mongoose.model("Referral", referralSchema);