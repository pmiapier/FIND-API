require('dotenv').config();
const app = require('express')();
const PORT = process.env.PORT || '8000';

app.listen(PORT, () => {
  console.log(`Server is alive on http://localhost:${PORT}`);
});
