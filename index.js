
const mysql = require('mysql');
//const Connection = require('mysql/lib/Connection');
const express =require('express');
var app =express();
const bodyparser = require('body-parser');
const { request } = require('express');
app.use(bodyparser.json());
var mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"infeon@1432",
    database:"employeedb",
    multipleStatements:true
});
mysqlConnection.connect((err)=>{
    if(!err)
    console.log("DB connection sucess")
    else
    console.log("DB connection failed in err/n:"+json.stringfy(err,undefined,2))

});


//consol based respomse

// app.get('/employees',(res,req)=>{
//     mysqlConnection.query('select * from employee',(err,rows,field)=>{
//         if(!err)
//         console.log(rows);
//         else
//         console.log(err);
//      })
//     })
//get all employee
app.get('/employees',(req,res)=>{
    mysqlConnection.query('select * from employee',(err,rows,field)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})
//get employye id based
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('select * from employee where EmpID=?',[req.params.id],(err,rows,field)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})

//get an deleted employee
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE from employee where EmpID=?',[req.params.id],(err,rows,field)=>{
        if(!err)
        res.send("deleted successsfuly");
        else
        console.log(err);
    })
})


app.post('/employees',(request,res)=>{
    let emp = request.body;
    //console.log("emp", emp)
    var sql ="SET @EmpID=?;SET @Name=?;SET @EmpCode=?;SET @Salary=?;\
    CALL EmployeeAddorEdit(@EmpID,@Name,@EmpCode,@Salary);"
        mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
            rows.forEach(element =>{
                if(element.constructor  ==Array)
                res.send('Inserted employee id :'+element[0].EmpID);
            });
        else
            console.log(err);
    
    })

});


app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

app.listen(3040,()=>console.log
('Express server is running at port no:3040.'));

