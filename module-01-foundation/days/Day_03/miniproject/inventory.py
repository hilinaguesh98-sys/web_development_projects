stock={}
try:
    with open("stock.txt","r") as f:
        for line in f:
            item, quantity =line.strip().split(",")
            stock[item]=int(quantity)
except FileNotFoundError:
    print("no stock file yet!")
def adjust(item,amount):
    stock[item]=stock.get(item,0)+amount
adjust("paracetamol",3)
adjust("asprin",-2)
adjust("amoxicillin",-10)
print("current stock")
for item,quantity in stock.items():
    print(f"{item}:{quantity}")
low_stock=[item for item,quantity in stock.items() if quantity<3]
print("low stock items")
if low_stock:
    for item in low_stock:
        print(item)
else:
    print("there is no low stocked item")
with open("stock.txt","w") as f:
    for item,quantity in stock.items():
        f.write(f"{item},{quantity}\n")
print("stock has been successfully saved")
               
