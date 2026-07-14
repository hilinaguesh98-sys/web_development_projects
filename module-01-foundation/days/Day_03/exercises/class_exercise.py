customers={}
try:
    with open("sq6-hilina-guesh/module-01-foundation/days/Day_03/exercises/transactions.txt","r") as f:
        for line in f:
            name, amount =line.strip().split(",")
            amount=float(amount)
            customers[name]=customers.get(name,0)+amount

    sorted_customers = sorted(
        customers.items(),
        key=lambda item: item[1],
        reverse=True
    )
    print("Transaction Report")
    for name, total in sorted_customers:
        print(f"{name}: {total}")
    with open("sq6-hilina-guesh/module-01-foundation/days/Day_03/exercises/transactions.txt", "w") as report:
        report.write("Transaction Report\n")
        for name, total in sorted_customers:
            report.write(f"{name}: {total}\n")

    print("\nReport saved to report.txt")
except FileNotFoundError:
    print("the file is not found")