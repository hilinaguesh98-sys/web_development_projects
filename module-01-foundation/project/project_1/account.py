class account:
    def __init__(self,owner,number,balance=0):
        self.owner=owner
        self.number=number
        self.__balance=balance
    @property
    def balance(self):
        return self.__balance
    def deposit(self,amount):
        if amount<=0:
            raise ValueError("amount must be positive")
        self.__balance+=amount
    def withdraw(self,amount):
         if amount<=0:
            raise ValueError("amount must be positive")
         if self.__balance<=0:
            raise ValueError("Insufficient balance")
         self.__balance-=amount
    def statement(self):
        print(f"{self.owner} : {self.number} : {self.__balance} ETB")

        
    
