from collections import deque
class branch:
    def __init__(self,name):
        self.name=name
        self.children=[]
        self.accounts=[]
    def add_child(self,child):
        self.children.append(child)
    def add_account(self,acc):
        self.accounts.append(acc)
    def total_balance(self):
        total=sum(a.balance for a in self.accounts)
        for child in self.children:
            total+=child.total_balance()
        return total
    @staticmethod
    def bfs(transfer,start):
        visited=set()
        queue=deque([start])
        reachable=[]
        while queue:
           current = queue.popleft()

           if current not in visited:
               visited.add(current)
               reachable.append(current)

               for neighbour in transfer.get(current, []):
                   if neighbour not in visited:
                     queue.append(neighbour)
        return reachable




    

   


    


        
    
