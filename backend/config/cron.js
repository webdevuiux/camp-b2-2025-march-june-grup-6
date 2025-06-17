const cron = require("node-cron");
const bookingController = require("../controllers/bookingController");

cron.schedule("0 0 * * *", () => {
  console.log("Running workshop reminder check...");
  bookingController.checkWorkshopReminders();
});