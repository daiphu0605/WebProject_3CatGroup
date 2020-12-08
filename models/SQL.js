module.exports = class SQL {
    constructor(){
        select = "";
        from = "";
        where = "";
    }
    Select(select) {
        this.select = "SELECT" + select;
    }
    From(from) {
        this.from = "FROM" + from;
    }
    Where(where) {
        this.where = "WHERE"+ where;
    }
    Query()
    {
        return this.select + " " + this.from + " " + this.where; 
    }
}
