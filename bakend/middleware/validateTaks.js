function validateTask(req, res, next){

const isCreate = req.method === "POST";
const { title } = req.body;

if (isCreate){
    if (title===undefined||title===null||typeof title!=="string"||title.trim()==="")
        {
        return res.status(400).json({error: "Title is required." });
        }
    if (title.trim().length < 3) {
        return res.status(400).json({error:"Title must be at least 3 characters." });}
        
} 
else{
    if (title !== undefined){
    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({error: "Title is rewuired"});
    }
    if (title.trim().length < 3) {
        return res.status(400).json({ error: "Title must be at least 3 chaacters." });
    }
    }
}
next();
}

module.exports = validateTask;