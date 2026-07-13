#1
cities=["mekelle","Addis Ababa","mekelle","adama","addis ababa"]
unique_cities=set(cities)
print(unique_cities)
#2
grocery={"onion":100,"tomato":100,"potato":60,"egg":20,"brade":15}
for name,price in grocery.items():
    print(f"{name},{price} ETB")
#3
prices = [100, 250, 400, 80]
price_with_tax=[]
for x in prices:
   new= x+(x*0.15)
   price_with_tax.append(new)
print(price_with_tax)
#4
for x in prices:
    if x<200:
        print(x)
#5
f=open("name.txt","w")
f.write("hilina\n")
f.write("jhon\n")
f.write("kidus")
f=open("name.txt","r")
for name in f:
    print(name)
#6
try:
    x=int(input("enter a number ="))
    result=1000/x
    print(f"result={result}")
except ValueError:
    print("Error! the value u have entered is not valid please enter valid number")
except ZeroDivisionError:
    print("Error!you can't devide by zero")



    