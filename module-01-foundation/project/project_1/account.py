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
        self._account__balance+=amount
    def withdraw(self,amount):
         if amount<=0:
            raise ValueError("amount must be positive")
         if self._account__balance<=0:
            raise ValueError("Insufficient balance")
         self._account__balance-=amount
    def statement(self):
        print(f"{self.owner} : {self.number} : {self.__balance:2f} ETB")
class savingaccount(account):
    def __init__(self, owner, number, balance=0,rate=0.05):
        super().__init__(owner, number, balance)
        self.rate=rate
    def add_interest(self):
        interest=self.balance*self.rate
        self.deposit(interest)
        print(f"interest added={interest} ETB")
    def statement(self):
        return super().statement()
class currentaccount(account):        
    def __init__(self, owner, number, balance=0,overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft=overdraft
    def withdraw(self,amount):
        if amount<=0:
             raise ValueError("amount must be positive")
        if amount>self._account__balance+self.overdraft:
             raise ValueError("overdraft limit exceeded")
        self._account__balance-=amount 
    def statement(self):
        return super().statement()
acc=account("hilina" ,1000346572, 1000)
acc1=savingaccount("hilina" ,1000346572, 1000)
acc2=currentaccount("hilina" ,1000346572, 1000)

acc.deposit(500)
acc.withdraw(45)
acc1.add_interest()
acc2.withdraw(300)
accounts=[acc,acc1,acc2]
for a in accounts:
    a.statement()
        
    
