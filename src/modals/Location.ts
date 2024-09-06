import mongoose, { Document, Model, Schema } from "mongoose";

interface ILocation extends Document {
  ip: string;
  geo: string;
}

const LocationSchema: Schema<ILocation> = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: [true, "Please provide a name"],
    },
    geo: {
      type: String,
      required: [true, "Please provide an email"],
    },
  },
  { timestamps: true }
);

const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>("Location", LocationSchema);

export default Location;
