class AccountRegistry:
    def __init__(self):
        self.by_number={}
        self.order=[]
    def add(self,acc):
        self.by_number[acc.number]= acc
        self.order.append(acc.number)
    def find(self,number):
        return self.by_number.get(number)
    def list_all(self):
        return [self.by_number[num] for num in self.order]
    def top_by_balance(self,n=5):
        accts=sorted(self.by_number.values(),key=lambda a:a.balance ,reverse=True )
        return accts[:n]
    def binary_search(items,target):
        lo,hi=0,len(items)-1
        while lo<=hi:
           mid=(lo+hi)//2
           if items[mid]==target:
               return mid 
           elif items[mid]<target:
               lo= mid+1
           else:
               hi=mid-1
    def find_by_number(self,number):
        nums=sorted(self.by_number)
        i=self.binary_search(nums,number)
        return self.by_number[nums[i] if i>=0 else None]
    def total_transaction(self,number):
        acc=self.find(number)
        if not acc:
            return 0
        def recurse_history(history_list,index):
            if index ==len(history_list):
                return 0
            _,amount = history_list[index]
            return amount+recurse_history(history_list,index+1)
        return recurse_history(acc.history,0)
