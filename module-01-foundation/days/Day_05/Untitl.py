def find_first_duplicate(nums):
    seen=set()
    for n in nums:
        if n in seen:
            return n
    return None
print(find_first_duplicate([5,64,65,378,3258,2]))