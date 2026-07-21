#list index
num=[1,2,3,4,5]
print(num[3]) 
# big-O complexity is O(1)
#because the interpreter directly accesses the element at the index 3 
# with out the need to itrate through the whole list


#single loop
num=[1,2,3,4,5]
for i in num:
    print(i)
# big-O complexity is O(n)
#because the interpreter needs to iterate
#  through the entire list to access each element


#nested loop
num=[1,2,3,4,5]
for i in num:
    for j in num:
        print(i, j)
# big-O complexity is O(n^2)
#because the interpreter needs to iterate 
# through the entire list for each element


#directory lookup
customers = {'John': 25, 'hilina': 30, 'kidus': 35}
print(customers['John'])  
# big-O complexity is O(1)
#because the interpreter directly accesses the value that is associated with the key 'John'
# with out the need to itrate through the whole dictionary


#binary search
num=[1,2,3,4,5]
target=4
left=0
right=len(num)-1
while left<=right:
    mid=(left+right)//2
    if num[mid]==target:
        print(mid)
        break
    elif num[mid]<target:
        left=mid+1
    else:
        right=mid-1
# big-O complexity is O(log n)
#because each step cuts the search in half

#2
import time
acc_list=[]
acc_dict={}
for i in range(100000):
    acc=f"1000{i}"
    acc_list.append(acc)
    acc_dict[acc]=i
target="100099999"
start=time.time()
found=target in acc_list
end=time.time()
print(f"list: {end-start} seconds")
start=time.time()
found=target in acc_dict
end=time.time()
print(f"dictionary: {end-start} seconds")

#3
class stack:
    def __init__(self):
        self.items=[]
    def push(self,item):
        self.items.append(item)
    def pop(self):
        return self.items.pop()
    def peek(self):
        return self.items[-1]
stack1=stack()
names=["hilina","kidus","john"]
for name in names:
    stack1.push(name)
reverse_names=[]
while stack1.items:
    reverse_names.append(stack1.pop())
print(reverse_names)
#4
from collections import deque
queue=deque()
queue.append("hilina")
queue.append("kidus")
queue.append("john")
queue.append("abel")
queue.append("bereket")
while queue:
    print(queue.popleft())
#5
class node:
    def __init__(self,data):
        self.data=data
        self.next=None
class linkedlist:
    def __init__(self):
        self.head=None
    def push_front(self,data):
        new_node=node(data)
        new_node.next=self.head
        self.head=new_node
    def print_all(self):
        current=self.head
        while current:
            print(current.data)
            current=current.next
linked=linkedlist()
linked.push_front("hilina")
linked.push_front("kidus")
linked.push_front("john")
linked.print_all()