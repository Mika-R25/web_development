import StudentModel from "../models/studentModel.js";

const StudentController={

async getAll(req,res){

    try{

        const students=await StudentModel.getAll();

        res.json({

            success:true,

            data:students

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

},

async getById(req,res){

    try{

        const student=await StudentModel.getById(req.params.id);

        if(!student){

            return res.status(404).json({

                success:false,

                message:"Data tidak ditemukan"

            });

        }

        res.json({

            success:true,

            data:student

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

},

async create(req,res){

    try{

        await StudentModel.create(req.body);

        res.status(201).json({

            success:true,

            message:"Data berhasil ditambahkan"

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

},

async update(req,res){

    try{

        await StudentModel.update(

            req.params.id,

            req.body

        );

        res.json({

            success:true,

            message:"Data berhasil diubah"

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

},

async delete(req,res){

    try{

        await StudentModel.delete(req.params.id);

        res.json({

            success:true,

            message:"Data berhasil dihapus"

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}

};

export default StudentController;
