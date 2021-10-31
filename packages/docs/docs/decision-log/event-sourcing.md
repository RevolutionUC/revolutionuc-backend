# Event Sourcing

## Issue
With DDD being implemented using domain events, we considered moving to an event sourced data model instead of a traditional database.

## Decision
We decided not to implement event-sourcing.

## Consequences
 - (Good) Usage and rules and encapsulated within domain events.
 - (Good) Full audit logging capabilities will lead to better accountability.
 - (Good) Easier debugging thanks to history of events.
 - (Good) Commands are more performant because only lightweight events need to be persisted.
 - (Bad) Queries are less performant since they require rebuilding the current state.
 - (Bad) Requires a change in infrastructure.
 - (Bad) Increases development complexity and learning curve.