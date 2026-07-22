class node:
    def __init__(self,value):
        self.value=value
        self.left=None
        self.right=None
def insert(root, value):
    if root is None:
        return node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root
def inorder(root):
    if root:
        inorder(root.left)
        print(root.value)
        inorder(root.right) 
root = None
numbers = [5,3,7,2,4,6,8]
for n in numbers:
    root = insert(root,n)
inorder(root)   
#2
def height(node):
    if node is None:
        return 0
    left_height = height(node.left)
    right_height = height(node.right)
    return 1 + max(left_height, right_height)
print(height(root))
#3
graph = {
     "A":["B","C"],
    "B":["A","D"],
    "C":["A","D"],
    "D":["B","C"]
}
from collections import deque
def bfs(graph,start):
    visited = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            for neighbor in graph[node]:
                queue.append(neighbor)
    return visited
print(bfs(graph,"A"))
#4
def dfs(graph,node,visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph,neighbor,visited)
    return visited
dfs(graph,"A")
#5
import heapq
tasks = []
heapq.heappush(tasks,(3,"study"))
heapq.heappush(tasks,(1,"sleep"))
heapq.heappush(tasks,(5,"watch movie"))
heapq.heappush(tasks,(2,"eat"))
heapq.heappush(tasks,(4,"exercise"))
while tasks:
    priority,task = heapq.heappop(tasks)
    print(priority,task)