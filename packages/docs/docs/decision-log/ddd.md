# Domain-Driven Design

## Issues
With the increasing scope of the system, the business rules were being entangled with implementation details and spread across service methods and utility functions. We considered DDD as an approach to properly understand and implement the business domain.

## Decision
We decided to implement strategic DDD to discover service boundaries, and tactical DDD to implement business and application rules.

## Consequences
 - (Good) Domain logic is implemented using entity modeling instead of services and utilities.
 - (Good) Understanding of the business domain is reflected clearly in the domain models.
 - (Good) Application logic is simplified and only concerned with invokation and persistence.
 - (Bad) Goes against the traditional CRUD mindset of new developers, increasing the learning curve.
 
