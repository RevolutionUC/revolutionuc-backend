# API Gateway

## Issue
After we decided to implement microservices, we had to decide whether we want to implement an API gateway for external systems, or to expose each microservice directly.

## Decision
We decided to implement an API gateway to authorize and route external requests to the appropriate microservices.

## Consequences
 - (Good) External systems and frontends will send requests to a single server.
 - (Good) Authentication rules will be applied at a single entry point.
 - (Good) The microservices can freely operate within a closed network with confidence.
 - (Good) Service boundary definitions will not leak outside the closed system.
 - (Good) The microservices can potentially be scaled horizontally, and the API gateway can load-balance requests.
 - (Good) Internal communication can potentially be upgraded to use service discovery, messaging queues, or service mesh instead of HTTP.
 - (Bad) Adds development complexity since new features have to be implemented at both API and service layers.
 - (Bad) Further decreases performance since additional network level calls are required.
