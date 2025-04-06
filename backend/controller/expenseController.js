const xlsx = require("xlsx");
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(200).json({ newExpense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding Expense" });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching Expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting Expense" });
  }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        
        //prepare data for excel
        const data = expenses.map((Expense) => ({
            category:Expense.category,
            Amount:Expense.amount,
            Date: Expense.date
            }));

            const wb= xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, 'Expense');
            xlsx.writeFile(wb,'Expense_details.xlsx');
            res.download('Expense_details.xlsx')
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: "Error downloading Expense excel"
            })
        }
};

exports.updateExpense = async(req,res)=>{
  const userId = req.user.id;
    const id = req.params.id;
    const {icon,category,amount,date}=req.body;
    try {
      const expense = await Expense.findByIdAndUpdate(id, {icon,category,amount,date}, {new: true});
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense updated" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Error updating expense" });
          }
}
