def total(nums):
    if len(nums)==0:
        return 0
    return nums[0] + total(nums[1:])
numbers=[1,2,3,4,5,6]
print(total(numbers))
def count_down(num):
    if num==0:
        return 0
    print(num)
    count_down(num-1)
count_down(10)
#2
def binary_search(item,target):
    left=0
    right=len(item) - 1
    while left <= right:
        mid=(left +right)//2
        if item[mid]==target:
            return mid 
        elif item[mid] < target:
            left=mid+1
        else:
            right=mid-1
    return -1
numbers=[2,3,5,6,8,10]
print(binary_search(numbers,6))
print(binary_search(numbers,7))
#3
def merge(left, right):
    result = []
    i = 0
    j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    return merge(left, right)
numbers = [9, 4, 7, 2, 6, 1]
print(merge_sort(numbers))
print(sorted(numbers))
#4
customers = [("hilina", 12),("jhon", 7),("kidus", 18),("abel", 9)]
sorted_accounts = sorted(customers,key=lambda customers: customers[1],
reverse=True)
print(sorted_accounts)
#5
def has_pair(nums, target):
    left = 0
    right = len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return True
        elif total < target:
            left += 1
        else:
            right -= 1
    return False
numbers = [2, 4, 6, 8, 10, 12]
print(has_pair(numbers, 14))
print(has_pair(numbers, 21))