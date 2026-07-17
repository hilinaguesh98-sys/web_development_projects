class bankconfig:
    _instance=None
    def __new__class(cls):
        if cls._instance is None:
            cls._instance=super().__new__(cls)
            cls._instance.interst_rate=0.05
            cls._instance.overdraft_limit=1000
        return cls._instance
class observer:
    def update(self,message):
        pass
class SMSAlert(observer):
    def update(self,message):
        print(f"smsalert: {message}")
class AuditLogger(observer):
    def update(self,message):
        print(f"auditlogger: {message}")
class account:
    def __init__(self,owner,number,balance=0):
        self.owner=owner
        self.number=number
        self.__balance=balance
        self.observers= []
    @property
    def balance(self):
        return self.__balance
    def subscriber(self,observer):
        self.observers.append(observer)
    def _notify(self,message):
        for observer in self.observers:
            observer.update(message)
            print()
    def deposit(self,amount):
        if amount<=0:
            raise ValueError("amount must be positive")
        self._account__balance+=amount
        self._notify(f"{self.owner} deposited {amount} ETB")
    def withdraw(self,amount):
         if amount<=0:
            raise ValueError("amount must be positive")
         if self._account__balance<=0:
            raise ValueError("Insufficient balance")
         self._account__balance-=amount
         self._notify(f"{self.owner} withdrew {amount} ETB")
    def statement(self):
        print(f"{self.owner} : {self.number} : {self.__balance:2f} ETB")
class savingaccount(account):
    def __init__(self, owner, number, balance=0,rate=0.05):
        super().__init__(owner, number, balance)
        self.rate=rate
        self.config=bankconfig()
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
        self.config=bankconfig()
    def withdraw(self,amount):
        if amount<=0:
             raise ValueError("amount must be positive")
        if amount>self._account__balance+self.overdraft:
             raise ValueError("overdraft limit exceeded")
        self._account__balance-=amount
        self._notify(f"{self.owner} withdrew {amount} ETB")
    def statement(self):
        return super().statement()
class accountfactory:
    @staticmethod
    def create_account(kind, owner, number, balance=0):
        if kind.lower() == "saving":
            return savingaccount(owner, number, balance)
        elif kind.lower() == "current":
            return currentaccount(owner, number, balance)
        else:
            raise ValueError("invalid account type")

        
    
