const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Introduzca la marca del vehículo"],
      trim: true,
    },
    model: {
      type: String,
      default: "not specified",
      trim: true,
    },
    fuelType: {
      type: String,
      required: [true, "Introduzca su combustible"],
      enum: [
        "Gasoleo A",
        "Gasoleo Premium",
        "Gasolina 95 E5",
        "Gasolina 98 E5",
      ],
    },
    averageFuel: {
      type: Number,
      // match: uu.dd
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
