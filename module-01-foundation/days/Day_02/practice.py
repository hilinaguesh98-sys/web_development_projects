temperature=int(input("enter the teperature in °C"))
if temperature<15:
    print("cold")
elif 15<temperature< 28:
    print("warm")
else:
    print("hot")
for recipt in range(1,10):
    print (f"recipt #N {recipt}")
for even in range(1,20):
    if even%2==0:
        print(even) 
def apply_discount(price, percent=0.1):
    discount= price*percent
    return discount 
count=5
while count>=1:
    print(count)
    count -=1
print("liftoff!")

