class report_builder:
    def build(self):
        print("building a report")
class report_saver:
    def save(self):
        print("saving a report")
class report_emailer:
    def email(self):
        print("emailing about the report")
bu=report_builder()
sa=report_saver()
em=report_emailer()
bu.build()
sa.save()
em.email()
        #2
class shape:
    def area(self):
        pass
class rectangle(shape):
    def __init__(self,width,height):
        self.width=width
        self.height=height
    def area(self):
        return self.width*self.height
class circle(shape):
    def __init__(self,radius):
        self.radius=radius
    def area(self):
        return 3.14*self.radius*self.radius
class triangle(shape):
    def __init__(self,base,height):
        self.base=base
        self.height=height
    def area(self):
        return 0.5*self.base*self.height

#3
class appsettings:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance
app=appsettings()
app1=appsettings()
print(app.currency,app1.currency)  
print(app is app1)  
    #4
class circle:
    print("circle")
class square:
    print("square")
class triangle:
    print("triangle")
class shapeFactory:
    @staticmethod
    def create(kind):
        if kind=="circle":
            return circle()
        elif kind=="square":
            return square()
        elif kind=="triangle":
            return triangle()
        else:
            raise ValueError("Unknown shape")
shape1=shapeFactory.create("circle")
shape2=shapeFactory.create("square")
shape3=shapeFactory.create("triangle")
#5
class newagency:
    def __init__(self):
        self.subscribers=[]
    def subscriber(self,subscriber):
        self.subscribers.append(subscriber)
    def notify(self,message):
        for subscriber in self.subscribers:
            subscriber.update(message)
class subscriber:
    def update(self,message):
        print(f"recived message {message}")
class subscriber1:
    def update(self,message):
        print(f"recived message {message}")
new=newagency()
sub1=subscriber()
sub2=subscriber1()
new.subscriber(sub1)
new.subscriber(sub2)
new.notify("hi subscribers")