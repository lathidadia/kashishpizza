const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    DIPS:  Symbol("dips"),
    ITEM:  Symbol("item")
});

module.exports = class PizzaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sDips = "";
        this.sItem = "";
        this.sTotal = 0;
        this.error = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Kashish's Pizza.");
                aReturn.push("What item would you like?\n 1.Pizza, 2.Burger, 3.Sub");
                break;
            case OrderState.ITEM:
                switch (sInput.toLowerCase()){
                    case "1":
                    case "Pizza":
                        this.sTotal = 15;
                        this.sItem = "Pizza";                       
                        break;
                    case "2":
                    case "Burger":
                        this.sTotal = 5;
                        this.sItem = "Burger";                        
                        break;
                    case "3":
                    case "Sub":
                        this.sTotal = 10;
                        this.sItem = "Sub";
                        break;
                    default:
                        this.stateCur = OrderState.ITEM;                        
                        this.error = "Please try again.\nWhat item would you like?\n 1.Pizza, 2.Burger, 3.Sub";
                        break;
                }
                if(this.error == "")
                    {
                        if(this.sItem == "Pizza"){
                            aReturn.push("What size pizza would you like?\n 1.Small, 2.Medium, 3.Large");
                            this.stateCur = OrderState.SIZE;
                        }
                        else{
                            aReturn.push("What toppings would you like?");
                            this.stateCur = OrderState.TOPPINGS;
                        }
                        
                    }
                else
                    aReturn.push(this.error)
                this.error = "";
                break;
            case OrderState.SIZE:
                switch (sInput.toLowerCase()){
                    case "1":
                    case "small":
                        this.sSize = "Small";                       
                        break;
                    case "2":
                    case "medium":
                        this.sTotal += 5;
                        this.sSize = "Medium";                        
                        break;
                    case "3":
                    case "large":
                        this.sTotal = 10;
                        this.sSize = "Large";
                        break;
                    default:
                        this.stateCur = OrderState.SIZE;                        
                        this.error = "Please try again.\nWhat size pizza would you like?\n 1.Small, 2.Medium, 3.Large";
                        break;
                }
                if(this.error == "")
                    {
                        aReturn.push("What toppings would you like?");
                        this.stateCur = OrderState.TOPPINGS;
                    }
                else
                    aReturn.push(this.error)
                this.error = "";
                break;

            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DIPS
                this.sToppings = sInput;
                aReturn.push("Would you like any dips with that?\n We have 1.Garlic, 2.Chipotle, 0.None");
                break;

            case OrderState.DIPS:
                switch (sInput.toLowerCase()){
                    case "0":
                    case "none": this.DIPS = "";
                        break;
                    case "1":
                    case "garlic":
                        this.sTotal += 2;
                        this.sDips = "Garlic";                       
                        break;
                    case "2":
                    case "chipotle":
                        this.sTotal += 3;
                        this.sDips = "Chipotle";                        
                        break;
                    default:
                        this.stateCur = OrderState.DIPS;                        
                        this.error = "Please try again.\nWould you like any dips with that? \n We have 1.Garlic, 2.Chipotle, 0.None";
                        break;
                } 
                if(this.error == "")
                    {
                        aReturn.push("What Drinks would you like?\n1.Coke, 2.Sprite, 0.None");
                        this.stateCur = OrderState.DRINKS;
                    }
                else
                    aReturn.push(this.error)
                this.error = "";
                break;

            case OrderState.DRINKS:
                switch (sInput.toLowerCase()){
                    case "0":
                    case "none": this.DRINKS = "";
                        break;
                    case "1":
                    case "coke":
                        this.sTotal += 10;
                        this.sDrinks = "Coke";                       
                        break;
                    case "2":
                    case "sprite":
                        this.sTotal += 10;
                        this.sSize = "Sprite";                        
                        break;
                    default:
                        this.stateCur = OrderState.DRINKS;                        
                        this.error = "Please try again.\nWhat Drinks would you like?\n1.Coke, 2.Sprite, 0.None";
                        break;
                } 
                if(this.error == "")
                    {
                        aReturn.push("Thank-you for your order of");
                        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                        if(this.sDrinks != ""){
                            aReturn.push(this.sDrinks);
                        }
                        if(this.sDips != ""){
                            aReturn.push(this.sDips);
                        }
                        let d = new Date(); 
                        d.setMinutes(d.getMinutes() + 20);
                        aReturn.push(`Your approximate total is $${this.sTotal}`);
                        aReturn.push(`Please pick it up at ${d.toTimeString()}`);                        
                        this.isDone(true);
                        
                    }
                else
                    aReturn.push(this.error)
                this.error = "";                
                break;
        }
        return aReturn;
    }
}