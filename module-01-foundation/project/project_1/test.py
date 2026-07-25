from account import  savingaccount
from bank import SMSAlert, AuditLogger, accountfactory
from registry import AccountRegistry
from bank_model import branch


class BankManagementSystem:
    account_counter = 1

    @classmethod
    def generate_account_number(cls):
        account_number = int(f"1000234124{cls.account_counter}")
        cls.account_counter += 1
        return account_number

    def __init__(self):
        self.registry = AccountRegistry()
        self.transfers = {}
        self.sms = SMSAlert()
        self.audit = AuditLogger()
        self.head_office = branch("Head Office")
        self.addis = branch("Addis Ababa")
        self.bole = branch("Bole Branch")
        self.megenagna = branch("Megenagna Branch")
        self.piassa = branch("Piassa Branch")
        self.mexico = branch("Mexico Branch")
        self.head_office.add_child(self.addis)
        self.addis.add_child(self.bole)
        self.addis.add_child(self.megenagna)
        self.addis.add_child(self.piassa)
        self.addis.add_child(self.mexico)
        self.branches = {
            "Head Office": self.head_office,
            "Addis Ababa": self.addis,
            "Bole Branch": self.bole,
            "Megenagna Branch": self.megenagna,
            "Piassa Branch": self.piassa,
            "Mexico Branch": self.mexico
        }
    
    def show_menu(self):
        print("ADDIS BANK ACCOUNT MANAGEMENT SYSTEM")
        print("1.  Create Account")
        print("2.  Deposit Money")
        print("3.  Withdraw Money")
        print("4.  Transfer Money")
        print("5.  Add Interest (Savings Account)")
        print("6.  Undo Last Transaction")
        print("7.  Find Account")
        print("8.  List All Accounts")
        print("9.  Top Accounts by Balance")
        print("10. Total Transaction Amount")
        print("11. Show Branch Total Balance")
        print("12. Assign Account to Branch")
        print("13. BFS (Reachable Accounts)")
        print("14. Exit")
    def create_account(self):
       
        print("\nCreate Account ")
        print("Account type:")
        print("1. Savings")
        print("2. Current")
        acc_type_choice = input("Choose (1 or 2): ").strip()
        if acc_type_choice == "1":
            acc_type = "saving"
        elif acc_type_choice == "2":
            acc_type = "current"
        else:
            print("Invalid choice.")
            return
        owner = input("Owner name: ").strip()

        try:
            balance = float(input("Initial balance: ").strip())
        except ValueError:
            print("Invalid balance.")
            return
        
        print("\nAvailable Branches:")
        for idx, branch_name in enumerate(self.branches.keys(), start=1):
            print(f"{idx}. {branch_name}")
        
        try:
            branch_choice = int(input("Choose a branch: ").strip())
            branch_names = list(self.branches.keys())
            
            if 1 <= branch_choice <= len(branch_names):
                selected_branch = branch_names[branch_choice - 1]
            else:
                print("Invalid branch choice.")
                return
        except ValueError:
            print("Invalid input.")
            return
        number = self.generate_account_number()

        try:
            acc = accountfactory.create_account(acc_type, owner, number, balance)
            acc.subscriber(self.sms)
            acc.subscriber(self.audit)
            
            self.registry.add(acc)
            self.branches[selected_branch].add_account(acc)
            self.transfers[number] = []
            
            print(f"\nAccount created successfully")
            print(f"Owner: {owner}")
            print(f"Type: {acc_type.capitalize()}")
            print(f"Number: {number}")
            print(f"Balance: {balance} ETB")
            print(f"Branch: {selected_branch}")
        except ValueError as e:
            print(f"Error: {e}")
    
    def deposit_money(self):
        print("\nDeposit Money")
        try:
            number = int(input("Enter account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        acc = self.registry.find(number)
        if not acc:
            print("Account not found.")
            return
        try:
            amount = float(input("Amount: ").strip())
        except ValueError:
            print("Invalid amount.")
            return
        try:
            acc.deposit(amount)
            print(f"Deposited {amount} ETB to {acc.owner}'s account.")
        except ValueError as e:
            print(f"Error: {e}")
    
    def withdraw_money(self):
        print("\n Withdraw Money ")
        
        try:
            number = int(input("Enter account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        
        acc = self.registry.find(number)
        if not acc:
            print("Account not found.")
            return
        
        try:
            amount = float(input("Amount: ").strip())
        except ValueError:
            print("Invalid amount.")
            return
        
        try:
            acc.withdraw(amount)
            print(f"Withdrew {amount} ETB from {acc.owner}'s account.")
        except ValueError as e:
            print(f"Error: {e}")
    
    def transfer_money(self):
        
        print("\n Transfer Money ")
        
        try:
            sender_num = int(input("Sender account number: ").strip())
            receiver_num = int(input("Receiver account number: ").strip())
            amount = float(input("Amount: ").strip())
        except ValueError:
            print("Invalid input.")
            return
        
        sender = self.registry.find(sender_num)
        receiver = self.registry.find(receiver_num)
        
        if not sender or not receiver:
            print("One or both accounts not found.")
            return
        
        try:
            sender.withdraw(amount)
            receiver.deposit(amount)
            
            if sender_num not in self.transfers:
                self.transfers[sender_num] = []
            if receiver_num not in self.transfers[sender_num]:
                self.transfers[sender_num].append(receiver_num)
            
            print(f"Transfer successful! {amount} ETB transferred from {sender.owner} to {receiver.owner}.")
        except ValueError as e:
            print(f"Error: {e}")
    
    def add_interest(self):
        
        print("\nAdd Interest (Savings Account)")
        
        try:
            number = int(input("Enter savings account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        acc = self.registry.find(number)
        if not acc:
            print("Account not found.")
            return
        if not isinstance(acc, savingaccount):
            print("This is not a savings account.")
            return
        
        try:
            acc.add_interest()
            print(f"Interest added to {acc.owner}'s account.")
        except Exception as e:
            print(f"Error: {e}")
    
    def undo_last_transaction(self):
        
        print("\n Undo Last Transaction")
        
        try:
            number = int(input("Enter account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        
        acc = self.registry.find(number)
        if not acc:
            print("Account not found.")
            return
        
        acc.undo_last()
    
    def find_account(self):
        print("\nFind Account")
        
        try:
            number = int(input("Enter account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        
        acc = self.registry.find(number)
        if not acc:
            print("Account not found.")
            return
        
        print(f"\nAccount Details")
        print(f"Owner: {acc.owner}")
        print(f"Account Number: {acc.number}")
        print(f"Balance: {acc.balance} ETB")
        print(f"Account Type: {type(acc).__name__}")
        print(f"Transaction History: {acc.history}")
    
    def list_all_accounts(self):
        
        print("\nAll Accounts")
        
        accounts = self.registry.list_all()
        if not accounts:
            print("No accounts found.")
            return
        
        print(f"\n{'Owner':<15} {'Account Number':<20} {'Balance':<15} {'Type':<10}")
        print("-" * 60)
        for acc in accounts:
            acc_type = "Savings" if isinstance(acc, savingaccount) else "Current"
            print(f"{acc.owner:<15} {acc.number:<20} {acc.balance:<15.2f} {acc_type:<10}")
    
    def top_accounts_by_balance(self):
        print("\nTop Accounts by Balance")
        
        try:
            n = int(input("How many accounts do you want to display? ").strip())
        except ValueError:
            print("Invalid input.")
            return
        top_accounts = self.registry.top_by_balance(n)
        
        if not top_accounts:
            print("No accounts found.")
            return
        
        print(f"\n{'Rank':<6} {'Owner':<15} {'Account Number':<20} {'Balance':<15}")
        
        for idx, acc in enumerate(top_accounts, start=1):
            print(f"{idx:<6} {acc.owner:<15} {acc.number:<20} {acc.balance:<15.2f} ETB")
    
    def total_transaction_amount(self):
       
        print("\n Total Transaction Amount")
        
        try:
            number = int(input("Enter account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        
        total = self.registry.total_transaction(number)
        acc = self.registry.find(number)
        
        if acc:
            print(f"Total transaction amount for {acc.owner}: {total} ETB")
        else:
            print("Account not found.")
    
    def show_branch_total_balance(self):
       
        print("\nBranch Total Balance")
        
        if not self.branches:
            print("No branches available.")
            return
        
        print("Available Branches:")
        for idx, branch_name in enumerate(self.branches.keys(), start=1):
            print(f"{idx}. {branch_name}")
        
        try:
            choice = int(input("Choose a branch: ").strip())
            branch_names = list(self.branches.keys())
            
            if 1 <= choice <= len(branch_names):
                selected_branch = branch_names[choice - 1]
            else:
                print("Invalid choice.")
                return
        except ValueError:
            print("Invalid input.")
            return
        
        total = self.branches[selected_branch].total_balance()
        print(f"Total balance in '{selected_branch}': {total} ETB")
    
    def assign_account_to_branch(self):
        
        print("\nAssign Account to Branch")
        try:
            number = int(input("Enter account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        
        acc = self.registry.find(number)
        if not acc:
            print("Account not found.")
            return
        
        if not self.branches:
            print("No branches available.")
            return
        
        print("Available Branches:")
        for idx, branch_name in enumerate(self.branches.keys(), start=1):
            print(f"{idx}. {branch_name}")
        
        try:
            choice = int(input("Choose a branch: ").strip())
            branch_names = list(self.branches.keys())
            
            if 1 <= choice <= len(branch_names):
                selected_branch = branch_names[choice - 1]
            else:
                print("Invalid choice.")
                return
        except ValueError:
            print("Invalid input.")
            return
        
        self.branches[selected_branch].add_account(acc)
        print(f"Account {number} assigned to '{selected_branch}'.")
    
    def show_reachable_accounts(self):
        
        print("\nReachable Accounts (BFS)")
        
        try:
            start_num = int(input("Enter starting account number: ").strip())
        except ValueError:
            print("Invalid account number.")
            return
        
        if start_num not in self.transfers:
            print("No transfer records for this account.")
            return
        
        reachable = branch.bfs(self.transfers, start_num)
        
        print(f"\nReachable accounts from {start_num}:")
        for idx, num in enumerate(reachable, start=1):
            acc = self.registry.find(num)
            if acc:
                print(f"{idx}. {num} ({acc.owner})")
            else:
                print(f"{idx}. {num}")
    
    def run(self):
        while True:
            self.show_menu()
            choice = input("Enter your choice (1-14) ").strip()
            
            if choice == "1":
                self.create_account()
            elif choice == "2":
                self.deposit_money()
            elif choice == "3":
                self.withdraw_money()
            elif choice == "4":
                self.transfer_money()
            elif choice == "5":
                self.add_interest()
            elif choice == "6":
                self.undo_last_transaction()
            elif choice == "7":
                self.find_account()
            elif choice == "8":
                self.list_all_accounts()
            elif choice == "9":
                self.top_accounts_by_balance()
            elif choice == "10":
                self.total_transaction_amount()
            elif choice == "11":
                self.show_branch_total_balance()
            elif choice == "12":
                self.assign_account_to_branch()
            elif choice == "13":
                self.show_reachable_accounts()
            elif choice == "14":
                print("\nThank you for using addis Bank Management System Goodbye")
                break
            else:
                print("Invalid choice. Please try again.")
if __name__ == "__main__":
    system = BankManagementSystem()
    system.run()


