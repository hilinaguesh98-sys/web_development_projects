from account import account
from account import savingaccount
from account import currentaccount
from account import SMSAlert
from account import AuditLogger
from account import accountfactory
acc=account("hilina" ,1000346572, 1000)
acc1=savingaccount("hilu" ,1000346578, 9000)
acc2=currentaccount("lily" ,1000346590, 7000)
sms=SMSAlert()
audit=AuditLogger()
acc3=accountfactory.create_account("saving", "jhon", 10003478867, 1000)
acc4=accountfactory.create_account("current", "abebe", 1000346578, 59)
acc.subscriber(sms)
acc.subscriber(audit)

acc1.subscriber(sms)
acc1.subscriber(audit)
acc1.add_interest()

acc2.subscriber(sms)
acc2.subscriber(audit)
acc3.subscriber(sms)
acc3.subscriber(audit)
acc4.subscriber(sms)
acc4.subscriber(audit)

acc.deposit(500)
acc.withdraw(45)  
acc1.add_interest()

acc2.withdraw(300)
acc3.withdraw(100)
acc4.withdraw(50)
acc3.deposit(2000)
acc4.deposit(1000)
acc3.add_interest()
accounts=[acc,acc1,acc2,acc3,acc4]
for a in accounts:
    a.statement()