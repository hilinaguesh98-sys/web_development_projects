class book:
    def __init__(self,title,author,pages):
        self.title=title
        self.author=author
        self.pages=pages
    def describe(self):
        print(f"{self.title},{self.author},{self.pages}")
display=book("the great gatsby", "f.scott fitzgerald", 180)
display2=book("pride and prejudice","jane austen",432)
display.describe()
display2.describe()
class product:
    def __init__(self,name,price,quantity):
        self.name=name 
        self.price=price
        self.__quantity=quantity
    @property
    def quantity(self):
        return self.__quantity
    def restock(self,amount):
       self.__quantity += amount
       print(f"{self.name} , {self.price}ETB , {self.__quantity}")
    def sell(self,amount):
        self.__quantity-= amount
        if self.__quantity>0:
            print(f"{self.name} , {self.price}ETB , {self.__quantity}")
        else:
            print("the product is not in hand")
        
display=product("ceraVe",5500,20)
display2=product("egg",20,200)
display3=product("dress",4000,30)
print(f"{display.name} , {display.price} ETB ,{display.quantity}")
print(f"{display2.name} , {display2.price} ETB ,{display2.quantity}")
print(f"{display3.name} , {display3.price} ETB ,{display3.quantity}")
display.restock(10)
display.sell(15)

        


