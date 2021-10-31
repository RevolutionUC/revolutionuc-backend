# Command Query Separation

## Issue
After the decision of implementing tactical DDD, we had to figure out a structure for application logic. CQS provides a nice framework to use for structuring use-cases vs traditional CRUD-based use-cases.

## Decision
We decided to implement CQS on our application level.

## Consequences
 - (Good) Use cases can be clearly defined as commands and queries, providing a solid application structure.
 - (Good) Queries don't need to execute any business logic, making them simpler to understand and develop.
 - (Good) Queries can directly access the persistence layer and implement highly-optimized database queries.
 - (Good) Commands can execute business logic without any expectations of what data needs to be returned.
 - (Bad) Consumers that want fresh data after a successful command execution will need to query the system, increasing usage complexity.
 - (Bad) Goes against the traditional CRUD mindset of new developers, increasing the learning curve.

