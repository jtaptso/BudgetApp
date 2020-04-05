# Model a SQL Database

Entity - The description of some thing in you database
    Record - is a single instance of an entity

Every Record will have:
    Created At - datetime
    Updated At - datetime
    Deleted At - datetime

## Entities in a Budget system

* [x] User
        UserName
        UserEamil
        Userpassword

* [x] Budget
        EntryDate
        ItemGroups (List of item groups)
        Budget_type
            Personal
            Business
        Report

* [x] Item group
        ItemGroupName
        Items (List of items)
        TotalAmount
        percentangeFromTotalIncomeExpected
        percentangeFromTotalIncomeReal

* [x] Item
        ItemName
        ItemType
            Input (In bank account)
            Output (from Bank account)
        SollAmount
        IsAmount
        quantity
        AmountCurrency
        Comment
        EntryDate

* [x] Report
        TotalExpectedIncome
        TotalRealIncome
        TotalExpectedOutcome
        TotalRealOutcome
        ExpectedRemain
        RealRemain






