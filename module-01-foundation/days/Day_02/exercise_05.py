name_and_balance=[("abebe",600), ("kebede",400),("hilina",1500),("jhon",700)]
def get_tier(balance):
    if balance>=1000:
        return "premium"
    elif balance>=500:
        return "standard"
    else:
        return "basic"
def apply_tax(balance, rate=0.15):
    balance_plus_tax=balance +(balance*rate)
    return balance_plus_tax
total_customers=0
total_balance=0
for name,balance in name_and_balance:
    tier=get_tier(balance)
    balance_with_tax=apply_tax(balance)
    if tier=="premium":
        print(f"congrtulation {name} you are a premium customer")
    print(f"{name}:{tier}| balance:{balance}|with tax:{balance_with_tax}ETB")
    total_customers+=1
    total_balance+=balance
print(f"total customers= {total_customers}")
print(f"combined balance of all customers={total_balance}")

    