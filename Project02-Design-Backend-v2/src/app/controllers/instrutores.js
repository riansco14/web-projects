const {idade,date} = require('../../util/data');
const Instrutor=require('../model/Instrutor');

module.exports={
    index(req,res){
        Instrutor.all(function(instrutores){
           console.log(instrutores);
           
            return res.render("instrutores/index", {instrutores});
        });
    },
    create(req,res){
        return res.render("instrutores/cadastro");
    },
    post(req,res){
        //["avatar_url","name","data_nasc","sexo","servicos"]
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os campos");
        }

        Instrutor.create(req.body,function(id){
            return res.redirect(`instrutores/${id}`);
        });

    },
    show(req,res){
        Instrutor.find(req.params.id, function(instrutorResult){
            if(!instrutorResult)
                return res.send("Instrutor Not Found");

            const instrutor = {
                ...instrutorResult,
                idade: idade(instrutorResult.data_nasc),
                servicos: instrutorResult.servicos.split(","),
                created_at: date(instrutorResult.created_at).aniversario
            };

            return res.render(`instrutores/show`, {instrutor});
        })
    },
    edit(req,res){
        Instrutor.find(req.params.id, function(instrutorResult){
            if(!instrutorResult)
                return res.send("Instrutor Not Found");
            const instrutor = {
                ...instrutorResult,
                data_nasc: date(instrutorResult.data_nasc).iso
            };
            console.log(instrutor);
            return res.render(`instrutores/editar`, {instrutor});
        });
        
    },
    put(req,res){
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os campos");
        }
        Instrutor.update(req.body, function (){
            return res.redirect(`instrutores/${req.body.id}`);
        });
    },
    delete(req,res){
        Instrutor.delete(req.params.id, function(){
            return res.redirect("/instrutores");
        });
    }
}
