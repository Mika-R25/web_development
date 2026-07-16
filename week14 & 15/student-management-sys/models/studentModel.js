import db from "../config/db.js";

const StudentModel = {

    async getAll() {

        const [rows] = await db.query(`
            SELECT *
            FROM students
            ORDER BY id DESC
        `);

        return rows;

    },

    async getById(id) {

        const [rows] = await db.query(
            "SELECT * FROM students WHERE id=?",
            [id]
        );

        return rows[0];

    },

    async create(data) {

        const sql = `
            INSERT INTO students
            (npm,nama,jurusan,semester,email,alamat)
            VALUES(?,?,?,?,?,?)
        `;

        const [result] = await db.query(sql,[
            data.npm,
            data.nama,
            data.jurusan,
            data.semester,
            data.email,
            data.alamat
        ]);

        return result;

    },

    async update(id,data){

        const sql=`
            UPDATE students
            SET
                npm=?,
                nama=?,
                jurusan=?,
                semester=?,
                email=?,
                alamat=?
            WHERE id=?
        `;

        const [result]=await db.query(sql,[

            data.npm,

            data.nama,

            data.jurusan,

            data.semester,

            data.email,

            data.alamat,

            id

        ]);

        return result;

    },

    async delete(id){

        const [result]=await db.query(

            "DELETE FROM students WHERE id=?",

            [id]

        );

        return result;

    }

};

export default StudentModel;
