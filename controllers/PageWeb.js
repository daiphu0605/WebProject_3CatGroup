module.exports = class PageWeb {
    constructor(limit){
        this.LIMITED_ITEM_PER_PAGE = limit;
    }
    
    TotalPage(AmountItem)
    {
        var pages = AmountItem / this.LIMITED_ITEM_PER_PAGE;
        var x = parseInt(pages.toString());
        if (x < pages)
        {
            return x + 1;
        }
        else 
        {
            return x;
        }
    }
}