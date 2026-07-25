from account import savingaccount
from account import currentaccount
class bankconfig:
    _instance=None
    def __new__(cls):
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
class accountfactory:
    @staticmethod
    def create_account(kind, owner, number, balance=0):
        if kind.lower() == "saving":
            return savingaccount(owner, number, balance)
        elif kind.lower() == "current":
            return currentaccount(owner, number, balance)
        else:
            raise ValueError("invalid account type")