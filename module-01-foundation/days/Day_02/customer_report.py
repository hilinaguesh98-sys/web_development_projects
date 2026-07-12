customer=[("abebe",600), ("kebede",400),("hilina",1500),("jhon",700),("abel",400)]
def tier(balance):
    if balance>=1000:
        return "premium"
    elif balance>=500:
        return "standard"
    else:
        return "basic"
premium=0
standard=0
basic=0
for name,balance in customer:
    customer_tier=tier(balance)
    print(f"name= {name}| tier={customer_tier}|balance= {balance} ETB")
    if customer_tier=="premium":
         premium+=1
    elif customer_tier=="standard":
        standard+=1
    else:
        basic+=1
print(f"premium={premium}")
print(f"standard={standard}")
print(f"basic={basic}")