# Command Query Responsibility Segregation

## Issue
A natural discussion point that stems from the decision of implementing CQS is of CQRS, which implements the command-query separation at the infrastructure layer.

## Decision
We decided not to implement CQRS.

## Consequences
 - (Good) Separate models designed for efficient reads and writes.
 - (Good) Write models can be freely designed to store all the relevant data.
 - (Good) Read models can be stored in an in-memory database for highly performant queries.
 - (Bad) Increases development complexity and learning curve.
 - (Bad) Requires a complex infrastructure of data stores and message queues.
 - (Bad) Requires a complex architecture of asynchronus command handlers.
 - (Bad) Introduces eventual consistency into the system.
 - (Bad) Consumers need to be able to distinguish between command-emitted events and replay events.