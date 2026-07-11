balance=500
while balance>0:
    print(f"current balance:{balance} ETB")
    balance-=100
for i in range(1,11):
   result=5 * i
   print(f"5*{i}={result}")
names=["Almaz", "Dawit", "Tigist", "Bereket"]
for names in names:
   if names=="Tigist":
        continue
   print(f"hello {names}")
for i in range(1,20):
    if i%7==0:
        print(i)
        break
   