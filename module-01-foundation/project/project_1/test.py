from account import account
from bank import SMSAlert,AuditLogger,accountfactory
from registry import AccountRegistry
from bank_model import branch


sms=SMSAlert()
audit=AuditLogger()
acc=accountfactory.create_account("current", "lily", 10003475675, 6000)
acc1=accountfactory.create_account("saving", "hilina", 10003478123, 270)
acc2=accountfactory.create_account("current", "kidus", 10004597312, 10000)
acc3=accountfactory.create_account("saving", "jhon", 10003478867, 1000)
acc4=accountfactory.create_account("current", "abebe", 1000346578, 590)
accounts=(acc,acc1,acc2,acc3,acc4)
for a in accounts:
    a.subscriber(sms)
    a.subscriber(audit)
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
registory=AccountRegistry()
repositories=(acc,acc1,acc2,acc3,acc4)
for r in repositories:
    registory.add(r)

found=registory.find(1000346578)
if found:
    found.statement()
print("accounts in registory")
for account in registory.list_all():
    account.statement()
print("top 3 by balance")
for idx, top_acc in enumerate(registory.top_by_balance(3), start=1):
    print(f"Rank {idx}: ", end="")
    top_acc.statement()
print("recursive transaction history amount sums")
for r in repositories:
    print(f"{r.owner} 's total transaction history is {registory.total_transaction(r.number)} ETB")

print ("balance befor undo")
acc.statement()
acc.undo_last()
print("account after undo")
acc.statement()
head_office=branch("Head office")
addis=branch("addis ababa")
bole=branch("bole branch")
megenagna=branch("megenagna branch")
piassa=branch("piassa branch")
mexico=branch("mexico branch")
head_office.add_child(addis)
addis.add_child(bole)
addis.add_child(megenagna)
addis.add_child(piassa)
addis.add_child(mexico)
head_office.add_account(acc)
addis.add_account(acc1)
bole.add_account(acc2)
megenagna.add_account(acc3)
piassa.add_account(acc4)
print("total balance of the whole bank")
print(f"{head_office.total_balance()}, ETB")
transfers = {
    acc.number: [acc1.number, acc2.number],
    acc1.number: [acc3.number],
    acc2.number: [acc4.number],
    acc3.number: [acc4.number],
    acc4.number: []
}
print("reachable accounts from",acc.number)
reachable = branch.bfs(transfers, acc.number)

for number in reachable:
    print(number)


