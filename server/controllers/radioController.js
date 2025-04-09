const Radio = require("../models/Radio");

// ✅ استرجاع جميع المحطات المتاحة
exports.getAllRadios = async (req, res) => {
  try {
    const radios = await Radio.find({ isActive: true });
    res.json(radios);
  } catch (error) {
    res.status(500).json({ error: "Error fetching radio stations" });
  }
};

// ✅ استرجاع محطة واحدة حسب ID
exports.getRadioById = async (req, res) => {
  try {
    const radio = await Radio.findById(req.params.id);
    if (!radio) return res.status(404).json({ error: "Radio not found" });
    res.json(radio);
  } catch (error) {
    res.status(500).json({ error: "Error fetching radio" });
  }
};

// ✅ إضافة محطة جديدة
exports.addRadio = async (req, res) => {
  try {
    const newRadio = new Radio(req.body);
    await newRadio.save();
    res.status(201).json(newRadio);
  } catch (error) {
    res.status(400).json({ error: "Error adding radio station" });
  }
};

// ✅ حذف محطة راديو
exports.deleteRadio = async (req, res) => {
  try {
    await Radio.findByIdAndDelete(req.params.id);
    res.json({ message: "Radio deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting radio" });
  }
};
