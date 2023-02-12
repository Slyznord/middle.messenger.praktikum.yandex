const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

console.log();

app.use(express.static(`${path.dirname(__dirname)}/dist`));
app.listen(PORT, () => {
	console.log(`Server started on ${PORT} port...`)
})
