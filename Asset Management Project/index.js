const express = require("express");
const PORT = 9000; // Changed to number
const app = express();
const cors = require('cors')

app.use(cors());


const bodyParser = require('body-parser'); // Keep this if you need to parse other types of bodies
const path = require('path'); // Ensure you use this if needed
const  {employeemaster,assetmasters} = require('./modal/Modal');
const { Pool } = require("pg");

// Use body-parser middleware if needed for parsing other types of bodies
app.use(bodyParser.json());


app.post('/emp', async(req, res) => {
    try {
        const {employeeID, employeeName, dateofbirth, email, phoneNumber, isActive} = req.body;
        const newEmployee = await employeemaster.create({employeeID, employeeName,  dateofbirth, email, phoneNumber, isActive});
        res.status(201).json(newEmployee); // Send JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
});
employeemaster.sync()
.then(() => console.log('employeemaster table created successfully.'))
.catch(error => console.error('Error creating employeemaster table:', error));
app.get('/empdet',async(req,res)=>{
    try {
        const emp = await employeemaster.findAll();
        res.status(200).json(emp);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
app.get('/empdet/:id', async (req, res) => {
    try {
        const emp = await employeemaster.findByPk(req.params.id);
        if (!emp) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(emp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/am', async(req, res) => {
    try {
        const {serialno, make, model, category, stockunit, issued, returned, reason, scrap} = req.body;
        const newAssetMaster = await assetmasters.create({serialno, make, model, category, stockunit, issued, returned, reason, scrap});
        res.status(201).json(newAssetMaster); // Send JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
});

app.get('/getasset',async(req,res)=>{
    try {
        const emp = await assetmasters.findAll();
        res.status(200).json(emp);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

app.get('/asset/:id', async (req, res) => {
    try {
        const emp = await assetmasters.findByPk(req.params.id);
        if (!emp) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.status(200).json(emp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/empdet/:id', async (req, res) => {
    const { id } = req.params; // Correctly destructure the id from req.params
    const { employeeName, dateofbirth, email, phoneNumber, isActive } = req.body;

    try {
        const [updatedRows, updatedCount] = await employeemaster.update({
            employeeName,
            dateofbirth,
            email,
            phoneNumber,
            isActive
        }, {
            where: { employeeID: id },
            returning: true // This option is specific to PostgreSQL and returns the updated rows
        });
        res.status(200).send({"msg":"successfull updated"})
      
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating employee');
    }
});

app.put('/asset/:id', async (req, res) => {
    const { id } = req.params; // Correctly destructure the id from req.params
    const {make, model, category, stockunit, issued, returned, reason, scrap} = req.body;

    try {
        const [updatedRows, updatedCount] = await assetmasters.update({
            make,
            model,
            category,
            stockunit,
            issued,
            returned,
            reason,
            scrap
        }, {
            where: { serialno: id },
            returning: true // This option is specific to PostgreSQL and returns the updated rows
        });
        res.status(200).send({"msg":"successfull updated"})
      
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating employee');
    }
});
assetmasters.sync()
.then(() => console.log('assetmaster table created successfully.'))
.catch(error => console.error('Error creating assetmaster table:', error));
// Corrected logging in app.listen
app.listen(PORT, () => console.log(`Task Started on port ${PORT}`));
