class Pizza:

    def prepare(self):
        print("Preparing pizza")

    def bake(self):
        print("Baking pizza")

    def cut(self):
        print("Cutting pizza")

    def box(self):
        print("Boxing pizza")


class NYCheesePizza(Pizza):

    def prepare(self):
        print("Preparing New York Cheese Pizza with mozzarella")

class NYPepperoniPizza(Pizza):

    def prepare(self):
        print("Preparing New York Pepperoni Pizza with pepperoni")

class ChicagoPepperoniPizza(Pizza):

    def prepare(self):  
        print("Preparing Chicago Pepperoni Pizza with pepperoni")

class ChicagoCheesePizza(Pizza):

    def prepare(self):
        print("Preparing Chicago Cheese Pizza with cheddar")

    def cut(self):
        print("Cutting Chicago Cheese Pizza")

class PizzaStore:

    def order_pizza(self, pizza_type):

        pizza = self.create_pizza(pizza_type)

        pizza.prepare()
        pizza.bake()
        pizza.cut()
        pizza.box()

        return pizza
    
    def create_pizza(self, pizza_type):
        raise NotImplementedError("Subclasses must implement create_pizza")


class NYPizzaStore(PizzaStore):

    def create_pizza(self, pizza_type):

        if pizza_type == "cheese":
            return NYCheesePizza()

        elif pizza_type == "pepperoni":
            return NYPepperoniPizza()

        else:
            raise ValueError("Unknown pizza type")


class ChicagoPizzaStore(PizzaStore):

    def create_pizza(self, pizza_type):

        if pizza_type == "cheese":
            return ChicagoCheesePizza()

        elif pizza_type == "pepperoni":
            return ChicagoPepperoniPizza()

        else:
            raise ValueError("Unknown pizza type")


ny_store = NYPizzaStore()
chicago_store = ChicagoPizzaStore()

print("Ordering from NY Store")
ny_store.order_pizza("cheese")

print()

print("Ordering from Chicago Store")
chicago_store.order_pizza("pepperoni")