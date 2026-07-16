from account import account
from account import savingaccount
from account import currentaccount
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