import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image_url: image_filename,
  });

  try {
    await food.save();

    res.json({ success: true, message: "Food Item Added" });
  } catch (error) {
    res.json({ success: false, message: "Food Item Not Added" });
  }
};

// list All Food
const listFood = async (req, res) => {
  try {
    const foodItems = await foodModel.find({});
    res.json({ success: true, data: foodItems });
  } catch (error) {
    res.json({ success: false, message: "can not get food" });
  }
};

// Remove Food Item

const removeFood = async (req, res) => {
  try {
    const foodItem = await foodModel.findById(req.body.id);
    fs.unlinkSync(`uploads/${foodItem.image_url}`);

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    res.json({ success: false, message: "can not remove food" });
  }
};
export { addFood, listFood, removeFood };
