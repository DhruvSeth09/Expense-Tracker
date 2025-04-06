const express=require("express");
const{
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
    UpdateIncome
} = require("../controller/incomeController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add",protect,addIncome);
router.get("/get",protect,getAllIncome);
router.delete("/:id",protect,deleteIncome);
router.get("/downloadexcel",protect,downloadIncomeExcel);
router.put("/:id",protect,UpdateIncome);

module.exports = router;
