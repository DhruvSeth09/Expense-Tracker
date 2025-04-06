const xlsx = require("xlsx");
const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.status(200).json({ newIncome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding income" });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching income" });
  }
};

exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const income = await Income.findByIdAndDelete(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting income" });
  }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        
        //prepare data for excel
        const data = incomes.map((income) => ({
            Source:income.source,
            Amount:income.amount,
            Date: income.date
            }));

            const wb= xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, 'Income');
            xlsx.writeFile(wb,'income_details.xlsx');
            res.download('income_details.xlsx')
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: "Error downloading income excel"
            })
        }
            
};

exports.UpdateIncome= async(req,res)=>{
  const userId = req.user.id;
  const id = req.params.id;
  const {icon,source,amount,date}=req.body;
  try {
    const income = await Income.findByIdAndUpdate(id, {icon,source,amount,date}, {new: true});
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
      }
      res.status(200).json({ message: "Income updated" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating income" });
        }
}
