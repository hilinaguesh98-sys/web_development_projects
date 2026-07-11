def is_even(number):
    if number%2==0:
       return True
    else:
        return False
number=int(input("enter a number"))
if is_even(number):
    print("even")
else:
    print("odd")
    #10
def add_tax(price, rate=0.15):
    return price + price * rate
    #11
add_tax(1000)
add_tax(1000, rate=0.10)
    #12
def describe_balance(balance):
    if balance>=1000:
       tiers= "premium"
    elif balance>=500:
        tiers= "standard"
    else:
        tiers= "basic"
    return tiers
    #13
print(tiers)
#tiers is local variable and can't be accessed outside of the function




