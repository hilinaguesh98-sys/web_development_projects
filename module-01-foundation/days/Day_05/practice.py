from abc import ABC,abstractmethod
class vehicle(ABC):
    def __init__(self,make,model):
        self.make=make
        self.model=model
   
    def describe(self):
        print ("this is a vehicle")
    @abstractmethod
    def abstract_wheels(self):
        pass
class car(vehicle):
    def describe(self):
      print("this is a car")
    def abstract_wheels(self):
        return 4
class truck(vehicle):
    def __init__(self,make,model,capacity):
        super().__init__(make,model)
        self.capacity=capacity
    def describe(self):
        print("this is a truck")
    def abstract_wheels(self):
        return 6
car1=car("toyota","corolla")
truck1=truck("lala","la",456)
vehicles=[car1,truck1]
for v in vehicles:
    v.describe()
print(car1.abstract_wheels())
print(truck1.abstract_wheels())

       
    
    