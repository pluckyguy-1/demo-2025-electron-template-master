const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');
const connectDB = require('./db');

let mainWindow;
let dbClient;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile(join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(async () => {
  dbClient = await connectDB();

  ipcMain.handle('getFamilyMembers', async () => {
    try {
      const result = await dbClient.query(`
        SELECT
          fm.FullName,
          EXTRACT(YEAR FROM AGE(fm.BirthDate)) AS Age,
          COALESCE(j.Position, 'Безработный') AS CurrentPosition,
          COALESCE(j.Organization, '-') AS Workplace,
          COALESCE(j.Salary, 0) AS TotalIncome,
          COALESCE(e.TotalExpenses, 0) AS TotalExpenses,
          CASE
            WHEN COALESCE(j.Salary, 0) > COALESCE(e.TotalExpenses, 0) THEN 'Профицит бюджета'
            ELSE 'Дефицит бюджета'
          END AS BudgetStatus
        FROM FamilyMembers fm
        LEFT JOIN (
          SELECT MemberID, SUM(Salary) AS Salary
          FROM Jobs
          GROUP BY MemberID
        ) j ON fm.MemberID = j.MemberID
        LEFT JOIN (
          SELECT MemberID, SUM(Quantity * UnitPrice) AS TotalExpenses
          FROM Expenses e
          JOIN Products p ON e.ProductID = p.ProductID
          WHERE PurchaseDate >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
            AND PurchaseDate < DATE_TRUNC('month', CURRENT_DATE)
          GROUP BY MemberID
        ) e ON fm.MemberID = e.MemberID;
      `);
      return result.rows;
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});