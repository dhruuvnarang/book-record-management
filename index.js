const express = require("express");

const app= express();

const PORT= 8081;

const { users }= require("./data/users.json");

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
         mesaage: "Server is up and running ",
    });
});

app.get("/users", (req,res) => {
    res.status(200).json( {
        success: true ,
        data : users ,
    });
});

app.get("/users/:id", (req,res) => {
    const {id}= req.params;
    const user=users.find((each) => each.id=== id );
    if(!user){
        return res.status(200).json( {
            success: false,
            message: "User not found",
        });
    }
    return res.status(200).json( {
        success: true,
        data: user,
    });
});

app.post("/users", (req,res) => {
    const { id, name , surname , email, subscriptionType, subscriptiondate} = req.body;
    
    const {user}= users.find((each) => each.id=== id );

    if(user){
        return res.status(404).json ({
        success: false,
        message: "user already exists with this id"
        })
    }
    
    users.push({
        id, 
        name,
        surname,
        email,
        subscriptionType,
        subscriptiondate,
    });
    return res.status(200).json ({
        success:true,
        data: users,
    })
});

app.get("*", (req,res) => {
    res.status(404).json( {
        message:"This route does not exist",
    });
});

app.listen( PORT, () => {
    console.log(`Server is up and running at port ${PORT}`);
});
