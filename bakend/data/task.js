let tasks=[];
module.exports ={
    getAll: () => tasks,
    getById:(id)=>tasks.find((t) => t.id==id),
    add:(task) => {
        tasks.push(task);
        return task;},
    update: (id, updates)=>{
        const index= tasks.findIndex((t) => t.id==id);
        if(index==-1){
            return null;
        }
        tasks[index]={...tasks[index],...updates};
        return tasks[index];
    },

    remove : (id)=>{
        const index= tasks.findIndex((t) => t.id==id);
        if(index==-1){
            return false ;
        }
        tasks.splice(index,1);
        return true;
    },
};
