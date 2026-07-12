bill_total=2000
number_of_people=4
friends={"abebe","kebede","hilina","jhon"}
def split_bill(total,people,tip_rate=0.10):
    bill_with_tip= total+(total*tip_rate)
    return bill_with_tip/people
share=split_bill(bill_total,number_of_people)
for friends in friends:
    print(f"{friends} should pay={share} ETB") 